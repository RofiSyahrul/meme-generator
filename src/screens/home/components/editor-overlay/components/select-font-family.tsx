import {useCallback} from 'react';
import {
  Option,
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '~/components/select';
import {Type} from '~/lib/icons';
import {useAppDispatch} from '~/store/hooks';
import {updateTextElementStyle} from '~/store/meme/meme-slice';
import {FieldComponentProps} from '../types';

const FONT_FAMILIES: string[] = [
  'System',
  'NotoSans',
  'Quicksand',
  'Roboto',
  'VictorMono',
];

export const SelectFontFamily: React.FC<FieldComponentProps<string>> = ({
  elementId,
  value,
}) => {
  const dispatch = useAppDispatch();

  const handleValueChange = useCallback(
    (option?: Option) => {
      dispatch(
        updateTextElementStyle({
          id: elementId,
          name: 'fontFamily',
          value: option?.value ?? 'System',
        }),
      );
    },
    [dispatch, elementId],
  );

  return (
    <Select onValueChange={handleValueChange} value={{label: value, value}}>
      <SelectTrigger>
        <Type className="text-foreground" />
      </SelectTrigger>
      <SelectContent side="bottom">
        <SelectLabel>Font Family</SelectLabel>
        {FONT_FAMILIES.map(fontFamily => (
          <SelectItem
            key={fontFamily}
            label={fontFamily}
            labelStyle={{fontFamily}}
            value={fontFamily}
          />
        ))}
      </SelectContent>
    </Select>
  );
};
