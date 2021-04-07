import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import NotificationContainer from '../components/NotificationContainer';
import Loading from '../components/Loading';
import {StackParamList} from '../navigators/StackNavigator';
import {RootState} from '../store';
import * as Notifications from 'expo-notifications';
import {setNotificationMessage, toggleLoading} from '../store/app/actions';
import {updateUser} from '../store/user/actions';
import { NotificationTypes } from '../store/app/types';

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
    const {loading, notification} = useSelector((state: RootState) => state.app);

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
                    dispatch(setNotificationMessage('Permissions not granted', NotificationTypes.Error, 5));
                }
            } else {
                const token = (await Notifications.getExpoPushTokenAsync()).data;

                dispatch(updateUser({notificationToken: token}));
                dispatch(toggleLoading(false));

                navigation.replace('Main');
            }
        } catch (error) {
            dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
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
                {notification.message && <NotificationContainer type={notification.type} message={notification.message}/>}
            </View>
    );
}

export default PermissionsScreen;
