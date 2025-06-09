import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';

import {Canvas} from './components/canvas';
import {StyleModal} from './components/style-modal';
import {TemplateSelector} from './components/template-selector';
import {Toolbar} from './components/toolbar';
import {store} from './store/store';
import {setTemplates} from './store/meme/meme-slice';
import {getMemeTemplates} from './services/meme-service';
import { useAppDispatch } from './store/hooks';
import { styles } from './app.styles';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const memeTemplates = await getMemeTemplates();
        dispatch(setTemplates(memeTemplates));
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [dispatch]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading meme templates...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <GestureHandlerRootView style={styles.gestureRoot}>
        <TemplateSelector />
        <Toolbar />
        <Canvas />
        <StyleModal visible={false} onClose={() => {}} />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
