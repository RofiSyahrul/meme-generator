import {View} from 'react-native';
import {Text} from '~/components/text';

export const FieldContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <View className="flex-row gap-1 w-full">{children}</View>;
};

export const Circle: React.FC<{label: string}> = ({label}) => {
  return (
    <View className="w-8 h-8 items-center justify-center rounded-full bg-foreground">
      <Text className="text-background font-bold">{label}</Text>
    </View>
  );
};
