import {type FC, useCallback, useState} from 'react';
import {View, Text, type LayoutChangeEvent} from 'react-native';

import {useAppSelector} from '@/store/hooks';

import {DraggableTemplate} from './components/draggable-template';
import {styles as draggableTemplateStyles} from './components/draggable-template/styles';
import {MemeElements} from './components/meme-elements';
import {styles} from './styles';

export const Canvas: FC = () => {
  const selectedTemplate = useAppSelector(state => state.meme.selectedTemplate);

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const {height, width} = event.nativeEvent.layout;
    setContainerHeight(height);
    setContainerWidth(width);
  }, []);

  if (!selectedTemplate) {
    return (
      <View onLayout={handleContainerLayout} style={styles.container}>
        <View style={draggableTemplateStyles.container}>
          <View style={styles.emptyCanvas}>
            <Text style={styles.emptyCanvasText}>
              Select a template to start creating your meme
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View onLayout={handleContainerLayout} style={styles.container}>
      <DraggableTemplate
        maxHeight={containerHeight}
        maxWidth={containerWidth}
        template={selectedTemplate}>
        <MemeElements />
      </DraggableTemplate>
    </View>
  );
};
