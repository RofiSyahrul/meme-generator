import {useCallback, useState, type FC, type ReactNode} from 'react';
import {
  Image,
  LayoutChangeEvent,
  type ImageErrorEventData,
  type NativeSyntheticEvent,
  type ViewStyle,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {usePanGesture, usePinchGesture} from '~/hooks/gesture';
import {cn} from '~/lib/utils';
import type {MemeTemplate} from '~/types/meme';

import {
  CONTAINER_PADDING,
  CONTAINER_PADDING_FACTOR,
  useTemplateSize,
} from './utils';

interface DraggableTemplateProps {
  children: ReactNode;
  maxHeight: number;
  maxWidth: number;
  onLayout: (event: LayoutChangeEvent) => void;
  template: MemeTemplate;
}

export const CONTAINER_CLASS_NAME = cn(
  'absolute top-0 left-0 right-0 w-full h-full',
  'bg-background rounded-xl shadow-foreground shadow-md elevation',
  'border border-border border-solid overflow-hidden',
);

export const DraggableTemplate: FC<DraggableTemplateProps> = ({
  children,
  maxHeight,
  maxWidth,
  onLayout,
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
        className={CONTAINER_CLASS_NAME}
        onLayout={onLayout}
        style={[containerAnimatedStyle, containerStyle]}>
        <GestureDetector gesture={templateGesture}>
          <Animated.View
            className={cn(
              'absolute w-full h-full bg-accent rounded-lg',
              'overflow-hidden justify-center items-center',
              'shadow-foreground shadow-md elevation',
            )}
            style={[
              templateAnimatedStyle,
              templateHeight > 0 && {
                height: templateHeight,
                width: templateWidth,
              },
            ]}>
            <Image
              source={{uri: template.url}}
              className="w-full h-full"
              onLoad={handleImageLoad}
              onError={handleImageError}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </Animated.View>
        </GestureDetector>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
