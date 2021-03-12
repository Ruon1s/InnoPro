import React from 'react';
import CustomButton from './CustomButton';
import InputField from './InputField';

interface Props {
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
}

const SignUpForm: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <>
      <InputField name="email" placeholder="Email" keyboardType="email-address" /> 
      <InputField name="fullName" placeholder="Full name" autoCapitalize="words" /> 
      <InputField name="password" placeholder="Password" secure /> 
      <InputField name="confirmPassword" placeholder="Confirm password" secure />
      <CustomButton title="Sign Up" onPress={handleSubmit} />
    </>
  );
}

export default SignUpForm;