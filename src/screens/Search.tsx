import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Search: React.FC = () => {

  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
}

export default Search;