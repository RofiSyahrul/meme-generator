import {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {cssInterop, useColorScheme} from 'nativewind';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Text} from '~/components/text';
import {NAV_THEME} from '~/lib/constants';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {fetchTemplates} from '~/store/meme/meme-service';

import {Canvas} from './components/canvas';
import {StyleModal} from './components/style-modal';
import {TemplateSelector} from './components/template-selector';
import {TextEditorPopup} from './components/text-editor-popup';
import {Toolbar} from './components/toolbar';

cssInterop(GestureHandlerRootView, {
  className: 'style',
});

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.meme.loading);
  const error = useAppSelector(state => state.meme.error);

  const {colorScheme = 'dark'} = useColorScheme();

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-muted">
        <ActivityIndicator
          size="large"
          color={NAV_THEME[colorScheme].primary}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View className="w-full flex-1 justify-center items-center bg-muted p-5">
        <Text className="text-destructive-foreground text-center">{error}</Text>
      </View>
    );
  }

  return <MemeGenerator />;
}

function MemeGenerator() {
  return (
    <GestureHandlerRootView className="flex-1 bg-muted">
      <Toolbar />
      <Canvas />
      <TemplateSelector />
      <StyleModal visible={false} onClose={() => {}} />
      <TextEditorPopup />
    </GestureHandlerRootView>
  );
}
