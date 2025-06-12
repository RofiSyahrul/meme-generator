import {type FC, useCallback, useMemo, useState} from 'react';
import {View, type LayoutChangeEvent} from 'react-native';

import {Text} from '~/components/text';
import {useAppSelector} from '~/store/hooks';

import {
  CONTAINER_CLASS_NAME,
  DraggableTemplate,
} from './components/draggable-template';
import {MemeElements} from './components/meme-elements';
import {ElementActions} from './components/element-actions';
import type {ActionLayouts} from './types';

export const Canvas: FC = () => {
  const selectedTemplate = useAppSelector(state => state.meme.selectedTemplate);
  const draggingElementId = useAppSelector(
    state => state.meme.draggingElementId,
  );
  const elementMap = useAppSelector(state => state.meme.elementMap);
  const [buttonLayouts, setButtonLayouts] = useState<ActionLayouts | null>(
    null,
  );

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [draggableTemplateHeight, setDraggableTemplateHeight] = useState(0);

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const {height, width} = event.nativeEvent.layout;
    setContainerHeight(height);
    setContainerWidth(width);
  }, []);

  const handleDraggableTemplateLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setDraggableTemplateHeight(event.nativeEvent.layout.height);
    },
    [],
  );

  const actionPlacement = useMemo(() => {
    const draggingElement = draggingElementId
      ? elementMap[draggingElementId]
      : null;
    if (
      !draggingElement ||
      draggingElement.position.y < draggableTemplateHeight / 2
    ) {
      return 'bottom';
    }
    return 'top';
  }, [draggableTemplateHeight, draggingElementId, elementMap]);

  return (
    <View
      className="relative flex-1 m-2 rounded-xl overflow-hidden"
      onLayout={handleContainerLayout}>
      {selectedTemplate ? (
        <DraggableTemplate
          maxHeight={containerHeight}
          maxWidth={containerWidth}
          onLayout={handleDraggableTemplateLayout}
          template={selectedTemplate}>
          <ElementActions
            onLayoutChange={setButtonLayouts}
            placement={actionPlacement}
          />
          <MemeElements buttonLayouts={buttonLayouts} />
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
