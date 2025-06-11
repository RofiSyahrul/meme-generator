import {Fragment, useCallback, useMemo, useRef, type FC} from 'react';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {runOnJS, useAnimatedStyle} from 'react-native-reanimated';

import {usePanGesture, usePinchGesture} from '@/hooks/gesture';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {updateElement} from '@/store/meme/meme-slice';
import type {MemeElement} from '@/types/meme';

import {styles} from './styles';
import {Image, Pressable, Text} from 'react-native';

interface DraggableElementProps {
  element: MemeElement;
}

const DOUBLE_TAP_MAX_DIFF = 300;

const DraggableElement: FC<DraggableElementProps> = ({element}) => {
  const lastPressedRef = useRef(0);
  const dispatch = useAppDispatch();

  const [scale, pinchGesture] = usePinchGesture(element.scale);

  pinchGesture
    .onEnd(() => {
      runOnJS(() => {
        dispatch(
          updateElement({id: element.id, updates: {scale: scale.value}}),
        );
      })();
    })
    .runOnJS(true);

  const [translateX, translateY, panGesture] = usePanGesture(
    element.position.x,
    element.position.y,
  );

  panGesture
    .onEnd(() => {
      runOnJS(() => {
        dispatch(
          updateElement({
            id: element.id,
            updates: {position: {x: translateX.value, y: translateY.value}},
          }),
        );
      })();
    })
    .runOnJS(true);

  const gesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  const handlePress = useCallback(() => {
    const now = Date.now();
    const diff = now - lastPressedRef.current;
    if (diff < DOUBLE_TAP_MAX_DIFF) {
      // handle double tap
      console.log('DOUBLE TAP');
    }
    lastPressedRef.current = now;
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.element, animatedStyle]}>
        <Pressable onPress={handlePress}>
          {element.type === 'text' ? (
            <Text style={element.style}>{element.content}</Text>
          ) : (
            <Image
              source={{uri: element.content}}
              style={[styles.image, {opacity: element.style?.opacity}]}
            />
          )}
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

export const MemeElements: FC = () => {
  const elementMap = useAppSelector(state => state.meme.elementMap);

  const elements = useMemo(() => {
    return Object.values(elementMap);
  }, [elementMap]);

  return (
    <Fragment>
      {elements.map(element => (
        <DraggableElement key={element.id} element={element} />
      ))}
    </Fragment>
  );
};
