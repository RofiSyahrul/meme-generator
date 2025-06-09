import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 2,
  },
  templateItem: {
    width: 100,
    margin: 5,
    alignItems: 'center',
  },
  selectedTemplate: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 5,
  },
  templateThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  templateName: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    color: '#333',
  },
});
