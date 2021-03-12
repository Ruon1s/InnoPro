import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { 
    width,
    position: 'absolute',
    bottom: 0,
  },
  content: {
    margin: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
  },
});

interface Props {
  errorMessage: string;
}

const ErrorContainer: React.FC<Props> = ({ errorMessage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.text}>
          {errorMessage}
        </Text>
      </View>
    </View>
  );
}

export default ErrorContainer;