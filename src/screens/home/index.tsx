import {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {fetchTemplates} from '@/store/meme/meme-service';

import {Canvas} from './components/canvas';
import {StyleModal} from './components/style-modal';
import {TemplateSelector} from './components/template-selector';
import {Toolbar} from './components/toolbar';
import {styles} from './styles';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.meme.loading);
  const error = useAppSelector(state => state.meme.error);

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <Toolbar />
      <Canvas />
      <TemplateSelector />
      <StyleModal visible={false} onClose={() => {}} />
    </GestureHandlerRootView>
  );
}
