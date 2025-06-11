import React from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';

import {Text} from '~/components/text';
import {cn} from '~/lib/utils';
import {useAppSelector, useAppDispatch} from '~/store/hooks';
import {setSelectedTemplate} from '~/store/meme/meme-slice';

export const TemplateSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const templates = useAppSelector(state => state.meme.templates);
  const selectedTemplate = useAppSelector(state => state.meme.selectedTemplate);

  return (
    <View className="h-32 border-t border-t-muted-foreground border-solid">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews>
        {templates.map(template => (
          <TouchableOpacity
            key={template.id}
            className={cn(
              'w-24 m-1 p-1 items-center',
              selectedTemplate?.id === template.id &&
                'border-2 border-primary rounded',
            )}
            onPress={() => dispatch(setSelectedTemplate(template))}>
            <Image
              source={{uri: template.url}}
              className="w-20 h-20 rounded"
              resizeMode="contain"
            />
            <Text
              className="text-xs mt-1 text-center text-muted-foreground"
              numberOfLines={1}>
              {template.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
