import {useColorScheme} from 'nativewind';
import React, {useCallback} from 'react';
import {View, Dimensions} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {Button} from '~/components/button';
import {Text} from '~/components/text';
import {NAV_THEME} from '~/lib/constants';
import {ImagePlus, TextCursorInput} from '~/lib/icons';
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

  const {colorScheme = 'dark'} = useColorScheme();

  const handleAddText = useCallback(() => {
    const newElement: MemeElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Double tap to edit',
      position: {...DEFAULT_POSITION},
      scale: 1,
      rotation: 0,
      style: {
        color: NAV_THEME[colorScheme].text,
        fontSize: 24,
        fontFamily: 'System',
      },
    };
    dispatch(addElement(newElement));
  }, [colorScheme, dispatch]);

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
          style: {
            opacity: 1,
            blur: 0,
          },
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
        <TextCursorInput className="text-foreground" />
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
