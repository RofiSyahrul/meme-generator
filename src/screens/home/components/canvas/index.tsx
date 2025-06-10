import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {setSelectedElement} from '@/store/meme/meme-slice';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {styles} from './styles';

export const Canvas: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTemplate = useAppSelector(state => state.meme.selectedTemplate);
  const elements = useAppSelector(state => state.meme.elements);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = savedScale.value * event.scale;
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate(event => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    });

  const simultaneousGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  return (
    <GestureDetector gesture={simultaneousGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {selectedTemplate ? (
          <Image
            source={{uri: selectedTemplate.url}}
            style={styles.template}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.emptyCanvas}>
            <Text style={styles.emptyCanvasText}>
              Select a template to start creating your meme
            </Text>
          </View>
        )}
        {elements.map(element => (
          <TouchableOpacity
            key={element.id}
            style={[
              styles.element,
              {
                left: element.position.x,
                top: element.position.y,
                transform: [
                  {scale: element.scale},
                  {rotate: `${element.rotation}deg`},
                ],
              },
            ]}
            onLongPress={() => dispatch(setSelectedElement(element))}>
            {element.type === 'text' ? (
              <Text style={element.style}>{element.content}</Text>
            ) : (
              <Image
                source={{uri: element.content}}
                style={[
                  styles.elementImage,
                  {
                    opacity: element.style?.opacity,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </Animated.View>
    </GestureDetector>
  );
};
