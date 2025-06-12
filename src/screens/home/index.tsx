import {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {useFocusEffect, useTheme} from '@react-navigation/native';
import {cssInterop} from 'nativewind';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Text} from '~/components/text';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {fetchTemplates} from '~/store/meme/meme-service';

import {Canvas} from './components/canvas';
import {TextEditorOverlay} from './components/editor-overlay/text-editor-overlay';
import {TemplateSelector} from './components/template-selector';
import {Toolbar} from './components/toolbar';
import {ImageEditorOverlay} from './components/editor-overlay/image-editor-overlay';

cssInterop(GestureHandlerRootView, {
  className: 'style',
});

function handleFocusEffect() {
  AvoidSoftInput.setAdjustPan();
  return () => {
    AvoidSoftInput.setDefaultAppSoftInputMode();
  };
}

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.meme.loading);
  const error = useAppSelector(state => state.meme.error);

  const {colors} = useTheme();

  useFocusEffect(handleFocusEffect);

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-muted">
        <ActivityIndicator size="large" color={colors.primary} />
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
      <TextEditorOverlay />
      <ImageEditorOverlay />
    </GestureHandlerRootView>
  );
}
