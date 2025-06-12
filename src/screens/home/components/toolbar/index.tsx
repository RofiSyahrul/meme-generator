import React, {useCallback} from 'react';
import {View, Dimensions} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

import {Button} from '~/components/button';
import {Text} from '~/components/text';
import {
  DEFAULT_MEME_IMAGE_STYLE,
  DEFAULT_MEME_TEXT_STYLE,
} from '~/lib/constants';
import {ImagePlus, Type} from '~/lib/icons';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {addElement} from '~/store/meme/meme-slice';
import {MemeElement} from '~/types/meme';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const POSITION_DENOMINATOR = 4;

const DEFAULT_POSITION: MemeElement['position'] = {
  x: SCREEN_WIDTH / POSITION_DENOMINATOR,
  y: SCREEN_HEIGHT / POSITION_DENOMINATOR,
};

export const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const hasSelectedTemplate = useAppSelector(
    state => !!state.meme.selectedTemplate,
  );

  const {colors} = useTheme();

  const handleAddText = useCallback(() => {
    const newElement: MemeElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Double tap to edit',
      position: {...DEFAULT_POSITION},
      scale: 1,
      rotation: 0,
      style: {
        ...DEFAULT_MEME_TEXT_STYLE,
        color: colors.text,
      },
    };
    dispatch(addElement(newElement));
  }, [colors.text, dispatch]);

  const handleImagePicker = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        console.error('ImagePicker Error: ', result.errorMessage);
        return;
      }

      if (result.assets && result.assets[0]?.uri) {
        const newElement: MemeElement = {
          id: Date.now().toString(),
          type: 'image',
          content: result.assets[0].uri,
          position: {...DEFAULT_POSITION},
          scale: 1,
          rotation: 0,
          style: {...DEFAULT_MEME_IMAGE_STYLE},
        };
        dispatch(addElement(newElement));
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  }, [dispatch]);

  return (
    <View className="flex-row items-center justify-center gap-2 p-4">
      <Button
        disabled={!hasSelectedTemplate}
        variant="ghost"
        onPress={handleAddText}>
        <Type className="text-foreground" />
        <Text>Text</Text>
      </Button>
      <Button
        disabled={!hasSelectedTemplate}
        variant="ghost"
        onPress={handleImagePicker}>
        <ImagePlus className="text-foreground" />
        <Text>Image</Text>
      </Button>
    </View>
  );
};
