import React from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  inputField: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 5,
    margin: 10,
  }
});

interface Props {
  placeholder: string;
}

const InputField: React.FC<Props> = ({ placeholder }) => {
  return (
    <TextInput style={styles.inputField} placeholder={placeholder}  />
  );
}

export default InputField;