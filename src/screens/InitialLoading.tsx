import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Loading from '../components/Loading';
import {StackParamList} from '../navigators/StackNavigator';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';
import {fetchUser} from '../store/user/actions';

interface Props {
    navigation: StackNavigationProp<StackParamList, 'Initial'>;
}

const InitialLoading: React.FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscirbe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(fetchUser(user.uid, navigation));
            } else {
                navigation.replace('SignIn');
            }
        });

        return () => unsubscirbe();
    }, []);

    return (
        <Loading/>
    );
}

export default InitialLoading;
