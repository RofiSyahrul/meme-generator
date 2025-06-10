import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './home';

const Stack = createNativeStackNavigator();

export default function Screens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={HomeScreen}
        name="Home"
        options={{title: 'Meme Generator'}}
      />
    </Stack.Navigator>
  );
}
