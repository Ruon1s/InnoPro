import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import InputField from '../components/InputField';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

const Search: React.FC = () => {

  return (
    <View style={styles.container}>
      <InputField placeholder="Search..." />
    </View>
  );
}

export default Search;