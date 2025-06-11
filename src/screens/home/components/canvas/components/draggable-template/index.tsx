import {useCallback, useState, type FC, type ReactNode} from 'react';
import {
  Image,
  type ImageErrorEventData,
  type NativeSyntheticEvent,
  type ViewStyle,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {usePanGesture, usePinchGesture} from '@/hooks/gesture';
import type {MemeTemplate} from '@/types/meme';

import {styles} from './styles';
import {
  CONTAINER_PADDING,
  CONTAINER_PADDING_FACTOR,
  useTemplateSize,
} from './utils';

interface DraggableTemplateProps {
  children: ReactNode;
  maxHeight: number;
  maxWidth: number;
  template: MemeTemplate;
}

export const DraggableTemplate: FC<DraggableTemplateProps> = ({
  children,
  maxHeight,
  maxWidth,
  template,
}) => {
  const [templateWidth, templateHeight] = useTemplateSize(
    template.width,
    template.height,
    maxHeight,
  );

  const [containerStyle, setContainerStyle] = useState<ViewStyle>({});

  const [containerScale, containerPinchGesture] = usePinchGesture();
  const [containerTranslateX, containerTranslateY, containerPanGesture] =
    usePanGesture();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: containerScale.value},
      {translateX: containerTranslateX.value},
      {translateY: containerTranslateY.value},
    ],
  }));

  const containerGesture = Gesture.Simultaneous(
    containerPinchGesture,
    containerPanGesture,
  );

  const [templateScale, templatePinchGesture] = usePinchGesture();
  const [templateTranslateX, templateTranslateY, templatePanGestrue] =
    usePanGesture(CONTAINER_PADDING, CONTAINER_PADDING);

  const templateAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: templateScale.value},
      {translateX: templateTranslateX.value},
      {translateY: templateTranslateY.value},
    ],
  }));

  const templateGesture = Gesture.Simultaneous(
    templatePinchGesture,
    templatePanGestrue,
  );

  const handleImageLoad = useCallback(() => {
    const containerHeight =
      templateHeight + CONTAINER_PADDING_FACTOR * CONTAINER_PADDING;
    const containerWidth =
      templateWidth + CONTAINER_PADDING_FACTOR * CONTAINER_PADDING;

    containerScale.set(1);
    containerTranslateX.set(
      (maxWidth - containerWidth) / CONTAINER_PADDING_FACTOR,
    );
    containerTranslateY.set(
      (maxHeight - containerHeight) / CONTAINER_PADDING_FACTOR,
    );

    templateScale.set(1);
    templateTranslateX.set(CONTAINER_PADDING);
    templateTranslateY.set(CONTAINER_PADDING);

    setContainerStyle({height: containerHeight, width: containerWidth});
  }, [
    containerScale,
    containerTranslateX,
    containerTranslateY,
    maxHeight,
    maxWidth,
    templateHeight,
    templateScale,
    templateTranslateX,
    templateTranslateY,
    templateWidth,
  ]);

  const handleImageError = useCallback(
    (event: NativeSyntheticEvent<ImageErrorEventData>) => {
      if (__DEV__) {
        console.error('Template load error:', event.nativeEvent.error);
      }
    },
    [],
  );

  return (
    <GestureDetector gesture={containerGesture}>
      <Animated.View
        style={[styles.container, containerAnimatedStyle, containerStyle]}>
        <GestureDetector gesture={templateGesture}>
          <Animated.View
            style={[
              styles.template,
              templateAnimatedStyle,
              templateHeight > 0 && {
                height: templateHeight,
                width: templateWidth,
              },
            ]}>
            <Image
              source={{uri: template.url}}
              style={styles.image}
              onLoad={handleImageLoad}
              onError={handleImageError}
              resizeMethod="resize"
            />
          </Animated.View>
        </GestureDetector>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
