import {useCallback} from 'react';

import {LucideIcon} from 'lucide-react-native';

import {AlignCenter, AlignLeft, AlignRight} from '~/lib/icons';
import {useAppDispatch} from '~/store/hooks';
import {updateTextElementStyle} from '~/store/meme/meme-slice';
import {MemeElementTextStyle} from '~/types/meme';

import {FieldComponentProps} from '../types';
import {Button} from '~/components/button';

type TextAlignment = MemeElementTextStyle['textAlign'];

const PREV_TO_NEXT_TEXT_ALIGN_MAP: Record<TextAlignment, TextAlignment> = {
  center: 'left',
  left: 'right',
  right: 'center',
};

const TEXT_ALIGN_TO_ICON_MAP: Record<TextAlignment, LucideIcon> = {
  center: AlignCenter,
  left: AlignLeft,
  right: AlignRight,
};

export const TextAlignUpdater: React.FC<FieldComponentProps<TextAlignment>> = ({
  elementId,
  value,
}) => {
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    dispatch(
      updateTextElementStyle({
        id: elementId,
        name: 'textAlign',
        value: PREV_TO_NEXT_TEXT_ALIGN_MAP[value],
      }),
    );
  }, [dispatch, elementId, value]);

  const Icon = TEXT_ALIGN_TO_ICON_MAP[value];

  return (
    <Button onPress={handlePress} variant="outline">
      <Icon className="text-foreground" />
    </Button>
  );
};
