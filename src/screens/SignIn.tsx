import {StackNavigationProp} from '@react-navigation/stack';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderText from '../components/HeaderText';
import {StackParamList} from '../navigators/StackNavigator';
import * as yup from 'yup';
import SignInForm from '../components/SignInForm';
import {SignInValues} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import Loading from '../components/Loading';
import NotificationContainer from '../components/NotificationContainer';
import {signIn} from '../store/user/actions';
import CustomButton from '../components/CustomButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        margin: 5,
        padding: 10,
    },
});

const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
});

const initialValues: SignInValues = {
    email: '',
    password: '',
}

interface Props {
    navigation: StackNavigationProp<StackParamList, 'SignIn'>;
}

const SignIn: React.FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();
    const {loading, notification} = useSelector((state: RootState) => state.app);

  const handleSubmit = (values: SignInValues) => {
    dispatch(signIn(values, navigation));
  }

    return (
        loading ?
            <Loading/>
            :
            <View style={styles.container}>
                <HeaderText text="Sign In"/>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({handleSubmit}) => <SignInForm handleSubmit={handleSubmit}/>}
                </Formik>
                <CustomButton
                    title="Don't have an account? Create one!"
                    onPress={() => navigation.navigate('SignUp')}
                    transparent={true}
                />
                {notification.message && <NotificationContainer type={notification.type} message={notification.message}/>}
            </View>
    );
}

export default SignIn;
