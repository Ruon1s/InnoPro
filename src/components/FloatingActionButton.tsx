import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
interface Props {
  onPress: (args: any) => void;
}

const FloatingActionButton: React.FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Animated.View style={styles.content}>
        <Ionicons name="add" size={30} />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default FloatingActionButton;
