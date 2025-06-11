import './index.css';

import {useEffect, useRef, useState} from 'react';
import {StatusBar} from 'react-native';

import {useColorScheme} from 'nativewind';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {NAV_THEME} from '~/lib/constants';
import {store} from '~/store/store';

import Screens from './screens';

const {PortalHost} = require('@rn-primitives/portal');

const THEMES: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: NAV_THEME.light,
  },
  dark: {
    ...DarkTheme,
    colors: NAV_THEME.dark,
  },
};

const App: React.FC = () => {
  const [isColorSchemeReady, setIsColorSchemeReady] = useState(false);
  const hasMounted = useRef(false);

  const {colorScheme = 'dark'} = useColorScheme();

  useEffect(() => {
    if (hasMounted.current) {
      return;
    }
    setIsColorSchemeReady(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={THEMES[colorScheme]}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Screens />
        <PortalHost />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
