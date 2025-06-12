import RNCSlider, {SliderProps} from '@react-native-community/slider';
import {useTheme} from '@react-navigation/native';
import {cssInterop} from 'react-native-css-interop';

cssInterop(RNCSlider, {
  className: 'style',
});

export const Slider: React.FC<SliderProps> = props => {
  const {colors} = useTheme();
  const {
    minimumValue = 0,
    maximumValue = 1,
    minimumTrackTintColor = colors.text,
    maximumTrackTintColor = colors.border,
    thumbTintColor = colors.text,
  } = props;
  return (
    <RNCSlider
      role="slider"
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      thumbTintColor={thumbTintColor}
      {...props}
    />
  );
};
