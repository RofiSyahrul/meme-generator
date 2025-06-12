import {useCallback} from 'react';

import {Slider} from '~/components/slider';
import {ALargeSmall} from '~/lib/icons';
import {useAppDispatch} from '~/store/hooks';
import {updateTextElementStyle} from '~/store/meme/meme-slice';

import {Circle, FieldContainer} from './container';
import {FieldComponentProps} from '../types';

export const FontSizeSlider: React.FC<FieldComponentProps<number>> = ({
  elementId,
  value,
}) => {
  const dispatch = useAppDispatch();

  const handleValueChange = useCallback(
    (newValue: number) => {
      dispatch(
        updateTextElementStyle({
          id: elementId,
          name: 'fontSize',
          value: newValue,
        }),
      );
    },
    [dispatch, elementId],
  );

  return (
    <FieldContainer>
      <ALargeSmall className="text-foreground" />
      <Slider
        className="flex-1"
        minimumValue={7}
        maximumValue={40}
        step={1}
        value={value}
        onValueChange={handleValueChange}
      />
      <Circle label={value.toFixed(0)} />
    </FieldContainer>
  );
};
