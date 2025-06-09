import React from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {useAppDispatch} from '@/store/hooks';
import {addElement} from '@/store/meme/meme-slice';
import {MemeElement} from '@/types/store';
import {styles} from './styles';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAddText = () => {
    const newElement: MemeElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Double tap to edit',
      position: {x: SCREEN_WIDTH / 4, y: SCREEN_HEIGHT / 4},
      scale: 1,
      rotation: 0,
      style: {
        color: '#000000',
        fontSize: 24,
        fontFamily: 'System',
      },
    };
    dispatch(addElement(newElement));
  };

  const handleAddImage = () => {
    const newElement: MemeElement = {
      id: Date.now().toString(),
      type: 'image',
      content: 'https://picsum.photos/200/200',
      position: {x: SCREEN_WIDTH / 4, y: SCREEN_HEIGHT / 4},
      scale: 1,
      rotation: 0,
      style: {
        opacity: 1,
        blur: 0,
      },
    };
    dispatch(addElement(newElement));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddText}>
        <Text>Add Text</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddImage}>
        <Text>Add Image</Text>
      </TouchableOpacity>
    </View>
  );
};
