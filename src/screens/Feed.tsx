import React, {useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WeatherInfo from '../components/WeatherInfo';
import {fetchWeather} from '../store/weather/actions';
import {events} from '../mock-data/events.json';
import {annoucements} from '../mock-data/announcements.json';
import List from '../components/List';
import TransportationInfo from '../components/TransportationInfo';
import {fetchTransport} from "../store/transportation/actions";
import HeaderText from '../components/HeaderText';
import { RootState } from '../store';

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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            dispatch(fetchWeather(position.coords.latitude, position.coords.longitude));
            dispatch(fetchTransport(position.coords.latitude, position.coords.longitude))
        });
    }, []);
    const user = useSelector((state: RootState) => state.user);

    return (
        <View style={styles.container}>
            <HeaderText text={`Hello, ${user.fullName.split(' ')[0]}`} />
            <ScrollView>
                <Text style={styles.header}>Weather</Text>
                <WeatherInfo/>
                <Text style={styles.header}>Announcements</Text>
                <List horizontal={true} data={annoucements}/>
                <Text style={styles.header}>Events</Text>
                <List horizontal={true} data={events}/>
                <Text style={styles.header}>Public Transportation</Text>
                <TransportationInfo/>
            </ScrollView>
        </View>
    );
}

export default Feed;
