import {useCallback} from 'react';

import {Slider} from '~/components/slider';
import {Blend} from '~/lib/icons';
import {useAppDispatch} from '~/store/hooks';
import {updateCommonElementStyle} from '~/store/meme/meme-slice';

import {Circle, FieldContainer} from './container';
import {FieldComponentProps} from '../types';

export const OpacitySlider: React.FC<FieldComponentProps<number>> = ({
  elementId,
  value,
}) => {
  const dispatch = useAppDispatch();

  const handleValueChange = useCallback(
    (newValue: number) => {
      dispatch(
        updateCommonElementStyle({
          id: elementId,
          name: 'opacity',
          value: newValue,
        }),
      );
    },
    [dispatch, elementId],
  );

  return (
    <FieldContainer>
      <Blend className="text-foreground" />
      <Slider
        className="flex-1"
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={value}
        onValueChange={handleValueChange}
      />
      <Circle label={value.toFixed(2)} />
    </FieldContainer>
  );
};
