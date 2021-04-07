import { FormikState } from 'formik';
import React from 'react';
import { SignUpValues } from '../types';
import CustomButton from './CustomButton';
import InputField from './InputField';

interface Props {
    handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
    resetForm: (nextState?: Partial<FormikState<SignUpValues>> | undefined) => void
}

/**
 * basic registration form
 * @param handleSubmit
 * @constructor
 */
const SignUpForm: React.FC<Props> = ({handleSubmit, resetForm}) => {
    return (
        <>
            <InputField name="email" placeholder="Email" keyboardType="email-address"/>
            <InputField name="fullName" placeholder="Full name" autoCapitalize="words"/>
            <InputField name="password" placeholder="Password" secure/>
            <InputField name="confirmPassword" placeholder="Confirm password" secure/>
            <CustomButton title="Sign Up" onPress={handleSubmit}/>
            <CustomButton title="Reset fields" transparent danger onPress={resetForm} />
        </>
    );
}

export default SignUpForm;
