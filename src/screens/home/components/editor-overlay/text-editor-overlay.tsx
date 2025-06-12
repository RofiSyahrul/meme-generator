import {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';

import {Button} from '~/components/button';
import {Dialog, DialogOverlay, DialogPortal} from '~/components/dialog';
import {Input} from '~/components/input';
import {Check} from '~/lib/icons';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {setSelectedElement, updateElement} from '~/store/meme/meme-slice';

import {
  BackgroundColorPicker,
  TextColorPicker,
} from './components/color-picker';
import {FontSizeSlider} from './components/font-size-slider';
import {OpacitySlider} from './components/opacity-slider';
import {SelectFontFamily} from './components/select-font-family';
import {TextAlignUpdater} from './components/text-align-updater';

export const TextEditorOverlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const element = useAppSelector(state => state.meme.selectedElement);
  const isVisible = element?.type === 'text';

  const [text, setText] = useState('');

  useEffect(() => {
    setText(element?.content ?? '');
  }, [element?.content]);

  const handleClose = useCallback(() => {
    dispatch(setSelectedElement(null));
  }, [dispatch]);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value) {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleSave = useCallback(() => {
    if (element && text) {
      dispatch(updateElement({id: element.id, updates: {content: text}}));
      handleClose();
    }
  }, [dispatch, element, handleClose, text]);

  return (
    <Dialog open={isVisible} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-background/80"
          closeOnPress={false}
          innerClassName="relative w-full h-full">
          {isVisible && (
            <View className="absolute top-20 w-full flex-row gap-4 items-center justify-center">
              <SelectFontFamily
                elementId={element.id}
                value={element.style.fontFamily}
              />
              <TextAlignUpdater
                elementId={element.id}
                value={element.style.textAlign}
              />
            </View>
          )}

          {isVisible && (
            <KeyboardAvoidingView
              behavior="padding"
              className="absolute bottom-2 w-full flex-col gap-6"
              keyboardVerticalOffset={50}>
              <View className="flex-row gap-2 justify-between w-full">
                <View className="flex-row gap-1">
                  <TextColorPicker
                    elementId={element.id}
                    value={element.style.color}
                  />
                  <BackgroundColorPicker
                    elementId={element.id}
                    value={element.style.backgroundColor}
                  />
                </View>
                <Button
                  className="p-1 w-14 h-14 native:h-14 rounded-full shadow-lg"
                  disabled={!text}
                  onPress={handleSave}>
                  <Check className="text-primary-foreground" size="32" />
                </Button>
              </View>

              <FontSizeSlider
                elementId={element.id}
                value={element.style.fontSize}
              />
              <OpacitySlider
                elementId={element.id}
                value={element.style.opacity}
              />
            </KeyboardAvoidingView>
          )}

          <KeyboardAvoidingView
            behavior="padding"
            className="absolute top-40 w-full flex-row items-center gap-1 p-4">
            <Input
              autoFocus
              allowFontScaling
              value={text}
              onChangeText={setText}
              placeholder="Enter text"
              className="flex-1 p-2 h-[unset] native:h-[unset] native:min-h-12 border-0"
              multiline
              style={element?.style}
            />
          </KeyboardAvoidingView>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};
