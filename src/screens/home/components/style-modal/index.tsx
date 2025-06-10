import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';

import {styles} from './styles';

interface StyleModalProps {
  visible: boolean;
  onClose: () => void;
}

export const StyleModal: React.FC<StyleModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <Text style={styles.title}>Style Options</Text>
        {/* Add style controls here */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
