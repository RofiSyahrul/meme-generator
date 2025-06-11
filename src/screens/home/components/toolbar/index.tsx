import {useColorScheme} from 'nativewind';
import React, {useCallback} from 'react';
import {View, Dimensions} from 'react-native';

import {Button} from '~/components/button';
import {Text} from '~/components/text';
import {NAV_THEME} from '~/lib/constants';
import {ImagePlus} from '~/lib/icons/image-plus';
import {TextCursorInput} from '~/lib/icons/text-cursor-input';
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

  const handleAddImage = useCallback(() => {
    const newElement: MemeElement = {
      id: Date.now().toString(),
      type: 'image',
      content: 'https://picsum.photos/200/200',
      position: {...DEFAULT_POSITION},
      scale: 1,
      rotation: 0,
      style: {
        opacity: 1,
        blur: 0,
      },
    };
    dispatch(addElement(newElement));
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
        onPress={handleAddImage}>
        <ImagePlus className="text-foreground" />
        <Text>Image</Text>
      </Button>
    </View>
  );
};
