import {useCallback} from 'react';
import {View, Pressable} from 'react-native';

import type {LucideIcon} from 'lucide-react-native';

import {Button} from '~/components/button';
import {Popover, PopoverContent, PopoverTrigger} from '~/components/popover';
import {Baseline, CircleSlash2, PaintBucket} from '~/lib/icons';
import {
  updateCommonElementStyle,
  updateTextElementStyle,
} from '~/store/meme/meme-slice';
import {useAppDispatch} from '~/store/hooks';

import type {FieldComponentProps} from '../types';

const COLORS = [
  // Basic Colors
  '#000000', // Black
  '#FFFFFF', // White
  '#808080', // Gray

  // Reds
  '#FF0000', // Red
  '#FF3333', // Light Red
  '#CC0000', // Dark Red
  '#FF6666', // Lighter Red

  // Greens
  '#00FF00', // Green
  '#33FF33', // Light Green
  '#008000', // Dark Green
  '#66FF66', // Lighter Green

  // Blues
  '#0000FF', // Blue
  '#3333FF', // Light Blue
  '#000080', // Dark Blue
  '#6666FF', // Lighter Blue

  // Yellows
  '#FFFF00', // Yellow
  '#FFFF33', // Light Yellow
  '#CCCC00', // Dark Yellow
  '#FFFF66', // Lighter Yellow

  // Purples
  '#800080', // Purple
  '#9933FF', // Light Purple
  '#4B0082', // Indigo
  '#CC99FF', // Lighter Purple

  // Oranges
  '#FFA500', // Orange
  '#FFB84D', // Light Orange
  '#CC8400', // Dark Orange
  '#FFCC80', // Lighter Orange

  // Browns
  '#A52A2A', // Brown
  '#CD5C5C', // Light Brown
  '#8B4513', // Dark Brown
  '#DEB887', // Lighter Brown

  // Pinks
  '#FFC0CB', // Pink
  '#FFB6C1', // Light Pink
  '#FF69B4', // Hot Pink
  '#FFE4E1', // Misty Rose

  // Teals
  '#008080', // Teal
  '#20B2AA', // Light Sea Green
  '#006666', // Dark Teal
  '#40E0D0', // Turquoise
];

type ColorPickerProps = {
  onSelectColor: (newValue: string) => void;
  triggerIcon: LucideIcon;
  value: string;
  withTransparent?: boolean;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  onSelectColor,
  triggerIcon: TriggerIcon,
  value,
  withTransparent,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex-row" variant="outline">
          <TriggerIcon className="text-foreground" />
          <View
            className="w-8 h-8 rounded-full border border-border"
            style={{backgroundColor: value}}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 max-w-[80vw]" side="top">
        <View className="flex-row flex-wrap gap-2 p-2">
          {withTransparent && (
            <Pressable onPress={() => onSelectColor('transparent')}>
              <CircleSlash2 className="text-border" size="32" />
            </Pressable>
          )}
          {COLORS.map(color => (
            <Pressable
              key={color}
              onPress={() => onSelectColor(color)}
              className="w-8 h-8 rounded-full border border-border"
              style={{backgroundColor: color}}
            />
          ))}
        </View>
      </PopoverContent>
    </Popover>
  );
};

export const TextColorPicker: React.FC<FieldComponentProps<string>> = ({
  elementId,
  value,
}) => {
  const dispatch = useAppDispatch();

  const handleSelectColor = useCallback(
    (newValue: string) => {
      dispatch(
        updateTextElementStyle({
          id: elementId,
          name: 'color',
          value: newValue,
        }),
      );
    },
    [dispatch, elementId],
  );

  return (
    <ColorPicker
      onSelectColor={handleSelectColor}
      triggerIcon={Baseline}
      value={value}
    />
  );
};

export const BackgroundColorPicker: React.FC<FieldComponentProps<string>> = ({
  elementId,
  value,
}) => {
  const dispatch = useAppDispatch();

  const handleSelectColor = useCallback(
    (newValue: string) => {
      dispatch(
        updateCommonElementStyle({
          id: elementId,
          name: 'backgroundColor',
          value: newValue,
        }),
      );
    },
    [dispatch, elementId],
  );

  return (
    <ColorPicker
      onSelectColor={handleSelectColor}
      triggerIcon={PaintBucket}
      value={value}
      withTransparent
    />
  );
};
