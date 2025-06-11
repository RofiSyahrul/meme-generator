import React from 'react';
import {View, ScrollView, TouchableOpacity, Text, Image} from 'react-native';

import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {setSelectedTemplate} from '@/store/meme/meme-slice';

import {styles} from './styles';

export const TemplateSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const templates = useAppSelector(state => state.meme.templates);
  const selectedTemplate = useAppSelector(state => state.meme.selectedTemplate);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews>
        {templates.map(template => (
          <TouchableOpacity
            key={template.id}
            style={[
              styles.templateItem,
              selectedTemplate?.id === template.id && styles.selectedTemplate,
            ]}
            onPress={() => dispatch(setSelectedTemplate(template))}>
            <Image
              source={{uri: template.url}}
              style={styles.templateThumbnail}
            />
            <Text style={styles.templateName} numberOfLines={1}>
              {template.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
