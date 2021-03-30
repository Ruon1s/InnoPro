import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import ErrorContainer from '../components/ErrorContainer';
import Loading from '../components/Loading';
import {StackParamList} from '../navigators/StackNavigator';
import {RootState} from '../store';
import * as Notifications from 'expo-notifications';
import {setErrorMessage, toggleLoading} from '../store/app/actions';
import {updateUser} from '../store/user/actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    textContent: {
        padding: 10,
    },
});

interface Props {
    navigation: StackNavigationProp<StackParamList, 'Permissions'>
}

const PermissionsScreen: React.FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();
    const {loading, errorMessage} = useSelector((state: RootState) => state.app);

    const askPermissions = async () => {
        try {
            dispatch(toggleLoading(true));
            const status = await Notifications.getPermissionsAsync();

            if (!status.granted) {
                const finalStatus = await Notifications.requestPermissionsAsync();
                if (finalStatus.granted) {
                    const token = (await Notifications.getExpoPushTokenAsync()).data;

                    dispatch(updateUser({notificationToken: token}));
                    dispatch(toggleLoading(false));

                    navigation.replace('Main');
                } else {
                    dispatch(toggleLoading(false));
                    dispatch(setErrorMessage('Permissions not granted', 5));
                }
            } else {
                const token = (await Notifications.getExpoPushTokenAsync()).data;

                dispatch(updateUser({notificationToken: token}));
                dispatch(toggleLoading(false));

                navigation.replace('Main');
            }
        } catch (error) {
            dispatch(setErrorMessage(error.message, 5));
        }
    }

    return (
        loading ?
            <Loading/>
            :
            <View style={styles.container}>
                <View style={styles.textContent}>
                    <Text>
                        This app would like to send notifications to you for better experience.
                        Notifications include important information about your surroundings.
                    </Text>
                </View>
                <CustomButton title="Give permissions" onPress={askPermissions}/>
                <CustomButton title="Maybe later" onPress={() => navigation.replace('Main')} transparent/>
                {errorMessage && <ErrorContainer errorMessage={errorMessage}/>}
            </View>
    );
}

export default PermissionsScreen;
