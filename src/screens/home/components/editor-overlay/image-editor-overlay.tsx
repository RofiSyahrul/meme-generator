import {useCallback} from 'react';
import {Image, View} from 'react-native';

import {Button} from '~/components/button';
import {Dialog, DialogOverlay, DialogPortal} from '~/components/dialog';
import {Check} from '~/lib/icons';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {setSelectedElement} from '~/store/meme/meme-slice';

import {BackgroundColorPicker} from './components/color-picker';
import {OpacitySlider} from './components/opacity-slider';

export const ImageEditorOverlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const element = useAppSelector(state => state.meme.selectedElement);
  const isVisible = element?.type === 'image';

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

  return (
    <Dialog open={isVisible} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-background/80"
          closeOnPress={false}
          innerClassName="relative w-full h-full">
          {isVisible && (
            <View className="absolute bottom-40 w-full flex-col gap-6">
              <View className="flex-row gap-2 justify-between w-full">
                <BackgroundColorPicker
                  elementId={element.id}
                  value={element.style.backgroundColor}
                />
                <Button
                  className="p-1 w-14 h-14 native:h-14 rounded-full shadow-lg"
                  onPress={handleClose}>
                  <Check className="text-primary-foreground" size="32" />
                </Button>
              </View>
              <OpacitySlider
                elementId={element.id}
                value={element.style.opacity}
              />
            </View>
          )}

          {isVisible && (
            <View className="absolute top-40 left-1/2 -translate-x-1/2">
              <View
                className="w-24 h-24 p-0.5 rounded"
                style={[element.style, {transform: [{scale: element.scale}]}]}>
                <Image
                  className="w-full h-full rounded"
                  resizeMode="contain"
                  source={{uri: element.content}}
                />
              </View>
            </View>
          )}
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};
