import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import HeaderText from '../components/HeaderText';
import {StackParamList} from '../navigators/StackNavigator';
import * as yup from 'yup';
import {Formik} from 'formik';
import SignUpForm from '../components/SignUpForm';
import {SignUpValues} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import NotificationContainer from '../components/NotificationContainer';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import {signUp} from '../store/user/actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    fullName: yup.string().required('Full name is required'),
    password: yup.string().min(6).required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords does not match')
});

const initialValues: SignUpValues = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
};

interface Props {
    navigation: StackNavigationProp<StackParamList, 'SignUp'>;
}

const SignUp: React.FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();
    const {loading, notification} = useSelector((state: RootState) => state.app);

    const handleSubmit = (values: SignUpValues) => {
        dispatch(signUp(values, navigation));
    }

    return (
        loading ?
            <Loading/>
            :
            <View style={styles.container}>
                <HeaderText text="Sign Up"/>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({handleSubmit, resetForm}) => <SignUpForm handleSubmit={handleSubmit} resetForm={resetForm} />}
                </Formik>
                <CustomButton
                    title="Already have an account? Sign In!"
                    onPress={() => navigation.goBack()}
                    transparent={true}
                />
                {notification.message && <NotificationContainer type={notification.type} message={notification.message}/>}
            </View>
    );
}

export default SignUp;
