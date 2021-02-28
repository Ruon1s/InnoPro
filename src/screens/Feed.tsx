import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Feed: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
}

export default Feed;