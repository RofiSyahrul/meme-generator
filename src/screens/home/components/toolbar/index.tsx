import {useCallback} from 'react';
import {View} from 'react-native';

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

const POSITION_DENOMINATOR = 4;

export const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const templateHeight = useAppSelector(state => state.meme.templateHeight);
  const templateWidth = useAppSelector(state => state.meme.templateWidth);

  const hasSelectedTemplate = useAppSelector(
    state => !!state.meme.selectedTemplate,
  );

  const {colors} = useTheme();

  const handleAddText = useCallback(() => {
    const newElement: MemeElement = {
      id: Date.now().toString(),
      type: 'text',
      content: '',
      position: {
        x: templateWidth / POSITION_DENOMINATOR,
        y: templateHeight / POSITION_DENOMINATOR,
      },
      scale: 1,
      rotation: 0,
      style: {
        ...DEFAULT_MEME_TEXT_STYLE,
        color: colors.text,
      },
    };
    dispatch(addElement(newElement));
  }, [colors.text, dispatch, templateHeight, templateWidth]);

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
          position: {
            x: templateWidth / POSITION_DENOMINATOR,
            y: templateHeight / POSITION_DENOMINATOR,
          },
          scale: 1,
          rotation: 0,
          style: {...DEFAULT_MEME_IMAGE_STYLE},
        };
        dispatch(addElement(newElement));
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  }, [dispatch, templateHeight, templateWidth]);

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
