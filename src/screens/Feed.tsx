import React, {useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WeatherInfo from '../components/WeatherInfo';
import {fetchWeather} from '../store/weather/actions';
import {events} from '../mock-data/events.json';
import {annoucements} from '../mock-data/announcements.json';
import List from '../components/List';
import TransportationInfo from '../components/TransportationInfo';
import EventInfo from '../components/EventInfo'
import {fetchTransport} from "../store/transportation/actions";
import HeaderText from '../components/HeaderText';
import { RootState } from '../store';
import {useTranslation} from 'react-i18next'
import {fetchEvents} from "../store/events/actions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    header: {
        fontWeight: '700',
        fontSize: 28,
        margin: 10,
    }
});

const Feed: React.FC = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            dispatch(fetchWeather(position.coords.latitude, position.coords.longitude));
            dispatch(fetchTransport(position.coords.latitude, position.coords.longitude));
            dispatch(fetchEvents(position.coords.latitude, position.coords.longitude));
        });
    }, []);
    const user = useSelector((state: RootState) => state.user);

    return (
        <View style={styles.container}>
            <HeaderText text={`${t('hello')}, ${user.fullName.split(' ')[0]}`} />
            <ScrollView>
                <Text style={styles.header}>{t("weather")}</Text>
                <WeatherInfo/>
                <Text style={styles.header}>{t("announcements")}</Text>
                <List horizontal={true} data={annoucements}/>
                <Text style={styles.header}>{t("events")}</Text>
                <EventInfo/>
                <Text style={styles.header}>{t("publicTransport")}</Text>
                <TransportationInfo/>
            </ScrollView>
        </View>
    );
};

export default Feed;
