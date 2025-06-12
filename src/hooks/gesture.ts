import {useMemo} from 'react';

import {Gesture} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

export const usePanGesture = (defaultTranslateX = 0, defaultTranslateY = 0) => {
  const savedTranslateX = useSharedValue(defaultTranslateX);
  const translateX = useSharedValue(defaultTranslateX);

  const savedTranslateY = useSharedValue(defaultTranslateY);
  const translateY = useSharedValue(defaultTranslateY);

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .onStart(() => {
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
      })
      .onUpdate(event => {
        translateX.value = savedTranslateX.value + event.translationX;
        translateY.value = savedTranslateY.value + event.translationY;
      });
  }, [savedTranslateX, savedTranslateY, translateX, translateY]);

  return [translateX, translateY, panGesture] as const;
};

export const usePinchGesture = (defaultScale = 1) => {
  const savedScale = useSharedValue(defaultScale);
  const scale = useSharedValue(defaultScale);

  const pinchGesture = useMemo(() => {
    return Gesture.Pinch()
      .onStart(() => {
        savedScale.value = scale.value;
      })
      .onUpdate(event => {
        scale.value = savedScale.value * event.scale;
      });
  }, [savedScale, scale]);

  return [scale, pinchGesture] as const;
};

export const useRotationGesture = (defaultRotation = 0) => {
  const savedRotation = useSharedValue(defaultRotation);
  const rotation = useSharedValue(defaultRotation);

  const rotationGesture = useMemo(() => {
    return Gesture.Rotation()
      .onStart(() => {
        savedRotation.value = rotation.value;
      })
      .onUpdate(event => {
        rotation.value = savedRotation.value + event.rotation;
      });
  }, [savedRotation, rotation]);

  return [rotation, rotationGesture] as const;
};
