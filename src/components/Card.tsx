import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 5,
    alignSelf: 'stretch',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
});

const Card: React.FC = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

export default Card;