import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  template: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
