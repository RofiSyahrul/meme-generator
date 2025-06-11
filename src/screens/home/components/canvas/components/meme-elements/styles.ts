import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  element: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    resizeMode: 'contain',
  },
});
