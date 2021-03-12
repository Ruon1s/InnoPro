import React from 'react';
import CustomButton from './CustomButton';
import InputField from './InputField';

interface Props {
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
}

const SignInForm: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <>
      <InputField name="email" placeholder="Email" keyboardType="email-address" /> 
      <InputField name="password" placeholder="Password" secure /> 
      <CustomButton title="Sign In" onPress={handleSubmit} />
    </>
  );
}

export default SignInForm;