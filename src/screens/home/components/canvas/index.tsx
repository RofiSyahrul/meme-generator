import {type FC, useCallback, useState} from 'react';
import {View, type LayoutChangeEvent} from 'react-native';

import {Text} from '~/components/text';
import {useAppSelector} from '~/store/hooks';

import {
  CONTAINER_CLASS_NAME,
  DraggableTemplate,
} from './components/draggable-template';
import {MemeElements} from './components/meme-elements';

export const Canvas: FC = () => {
  const selectedTemplate = useAppSelector(state => state.meme.selectedTemplate);

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const {height, width} = event.nativeEvent.layout;
    setContainerHeight(height);
    setContainerWidth(width);
  }, []);

  return (
    <View
      className="relative flex-1 m-2 rounded-xl overflow-hidden"
      onLayout={handleContainerLayout}>
      {selectedTemplate ? (
        <DraggableTemplate
          maxHeight={containerHeight}
          maxWidth={containerWidth}
          template={selectedTemplate}>
          <MemeElements />
        </DraggableTemplate>
      ) : (
        <View className={CONTAINER_CLASS_NAME}>
          <View className="flex-1 justify-center items-center bg-background rounded-lg border-2 border-border border-dashed">
            <Text className="text-center p-5 text-muted-foreground">
              Select a template to start creating your meme
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
