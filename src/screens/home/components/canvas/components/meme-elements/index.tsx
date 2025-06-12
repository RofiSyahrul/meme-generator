import {Fragment, useCallback, useMemo, useRef, type FC} from 'react';
import {Image, LayoutRectangle, Pressable, Text, View} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {runOnJS, useAnimatedStyle} from 'react-native-reanimated';

import {
  usePanGesture,
  usePinchGesture,
  useRotationGesture,
} from '~/hooks/gesture';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {
  updateElement,
  setSelectedElement,
  setDraggingElementId,
  duplicateElement,
  removeElement,
} from '~/store/meme/meme-slice';
import type {MemeElement} from '~/types/meme';

import {styles} from './styles';
import {cn} from '~/lib/utils';

import type {ActionLayouts} from '../../types';

interface DraggableElementProps {
  element: MemeElement;
  isSelected: boolean;
  buttonLayouts: ActionLayouts | null;
}

const DOUBLE_TAP_MAX_DIFF = 300;

const isPointInRect = (
  x: number,
  y: number,
  rect: LayoutRectangle,
): boolean => {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
};

const DraggableElement: FC<DraggableElementProps> = ({
  element,
  isSelected,
  buttonLayouts,
}) => {
  const lastPressedRef = useRef(0);
  const dispatch = useAppDispatch();

  const [scale, pinchGesture] = usePinchGesture(element.scale);
  const [rotation, rotationGesture] = useRotationGesture(element.rotation);

  pinchGesture
    .onEnd(() => {
      runOnJS(dispatch)(
        updateElement({id: element.id, updates: {scale: scale.value}}),
      );
    })
    .runOnJS(true);

  rotationGesture
    .onEnd(() => {
      runOnJS(dispatch)(
        updateElement({id: element.id, updates: {rotation: rotation.value}}),
      );
    })
    .runOnJS(true);

  const [translateX, translateY, panGesture] = usePanGesture(
    element.position.x,
    element.position.y,
  );

  panGesture
    .onEnd(() => {
      runOnJS(dispatch)(setDraggingElementId(null));
      runOnJS(dispatch)(
        updateElement({
          id: element.id,
          updates: {position: {x: translateX.value, y: translateY.value}},
        }),
      );
    })
    .runOnJS(true);

  const panGestureToTrackDragging = useMemo(() => {
    return Gesture.Pan().runOnJS(true);
  }, []);

  panGestureToTrackDragging
    .onStart(() => {
      runOnJS(dispatch)(setDraggingElementId(element.id));
    })
    .onEnd(({absoluteX, absoluteY}) => {
      if (!buttonLayouts) {
        return;
      }

      if (isPointInRect(absoluteX, absoluteY, buttonLayouts.duplicate)) {
        runOnJS(dispatch)(duplicateElement(element.id));
        runOnJS(dispatch)(setDraggingElementId(null));
      } else if (isPointInRect(absoluteX, absoluteY, buttonLayouts.remove)) {
        runOnJS(dispatch)(removeElement(element.id));
      }
    });

  const gesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    rotationGesture,
    panGestureToTrackDragging,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
      {rotate: `${rotation.value}rad`},
    ],
  }));

  const handlePress = useCallback(() => {
    const now = Date.now();
    const diff = now - lastPressedRef.current;
    if (diff < DOUBLE_TAP_MAX_DIFF) {
      dispatch(setSelectedElement(element));
    }
    lastPressedRef.current = now;
  }, [element, dispatch]);

  return (
    <GestureDetector gesture={gesture}>
      <View className={cn('contents group', isSelected && 'is-selected')}>
        <Animated.View
          className="absolute p-2 group-[.is-selected]:shadow-foreground"
          style={[animatedStyle, isSelected && styles.elementSelected]}>
          <Pressable onPress={handlePress}>
            {element.type === 'text' ? (
              <Text style={element.style}>{element.content}</Text>
            ) : (
              <Image
                className="w-24 h-24 rounded"
                resizeMode="contain"
                source={{uri: element.content}}
                style={{opacity: element.style?.opacity}}
              />
            )}
          </Pressable>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export const MemeElements: FC<{
  buttonLayouts: ActionLayouts | null;
}> = ({buttonLayouts}) => {
  const elementMap = useAppSelector(state => state.meme.elementMap);
  const selectedElement = useAppSelector(state => state.meme.selectedElement);

  const elements = useMemo(() => {
    return Object.values(elementMap);
  }, [elementMap]);

  return (
    <Fragment>
      {elements.map(element => (
        <DraggableElement
          key={element.id}
          element={element}
          isSelected={element.id === selectedElement?.id}
          buttonLayouts={buttonLayouts}
        />
      ))}
    </Fragment>
  );
};
