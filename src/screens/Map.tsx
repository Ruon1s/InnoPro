import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Map: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
    </View>
  );
}

export default Map;