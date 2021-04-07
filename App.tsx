import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigators/MainNavigator';
import { LogBox } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Subscription } from '@unimodules/core';
import './src/i18n';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const App = () => {
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer for a long period of time', 'Remote debugger']); //Ignore unnecessary warnings during dev

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
            if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
        }
    }, []);

    return (
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
    );
};

export default App;
