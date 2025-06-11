import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyCanvas: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  emptyCanvasText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});
