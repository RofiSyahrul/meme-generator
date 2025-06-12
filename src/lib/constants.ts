import type {Theme} from '@react-navigation/native';

import type {MemeElementImageStyle, MemeElementTextStyle} from '~/types/meme';

export const NAV_THEME: Record<'light' | 'dark', Theme['colors']> = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(214.3 31.8% 91.4%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(221.2 83.2% 53.3%)', // primary
    text: 'hsl(222.2 84% 4.9%)', // foreground
  },
  dark: {
    background: 'hsl(222.2 84% 4.9%)', // background
    border: 'hsl(217.2 32.6% 17.5%)', // border
    card: 'hsl(222.2 84% 4.9%)', // card
    notification: 'hsl(0 62.8% 30.6%)', // destructive
    primary: 'hsl(217.2 91.2% 59.8%)', // primary
    text: 'hsl(210 40% 98%)', // foreground
  },
};

export const DEFAULT_MEME_TEXT_STYLE: MemeElementTextStyle = {
  backgroundColor: 'transparent',
  color: NAV_THEME.light.text,
  fontFamily: 'System',
  fontSize: 20,
  opacity: 1,
  textAlign: 'center',
};

export const DEFAULT_MEME_IMAGE_STYLE: MemeElementImageStyle = {
  backgroundColor: DEFAULT_MEME_TEXT_STYLE.backgroundColor,
  opacity: DEFAULT_MEME_TEXT_STYLE.opacity,
};
