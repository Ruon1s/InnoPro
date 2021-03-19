import React, {useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WeatherInfo from '../components/WeatherInfo';
import List from '../components/List';
import TransportationInfo from '../components/TransportationInfo';
import {fetchTransport} from "../store/transportation/actions";
import HeaderText from '../components/HeaderText';
import { RootState } from '../store';
import ErrorContainer from '../components/ErrorContainer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    infoText: {
        color: 'silver',
        fontSize: 18,
        paddingLeft: 10,
    }
});

const Feed: React.FC = () => {
    const dispatch = useDispatch();
    const { errorMessage } = useSelector((state: RootState) => state.app);
    const user = useSelector((state: RootState) => state.user);
    const announcements = useSelector((state: RootState) => state.announcements);
    const news = useSelector((state: RootState) => state.news);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            dispatch(fetchTransport(position.coords.latitude, position.coords.longitude))
        });
    }, []);

    return (
        <View style={styles.container}>
            <HeaderText text={`Hello, ${user.fullName.split(' ')[0]}`} />
            <ScrollView>
                <HeaderText text="Weather" />
                <WeatherInfo/>
                <HeaderText text="News" />
                <Text style={styles.infoText}>Swipe left to see more... ({news.value.length} items)</Text>
                <List horizontal news={news} />
                <HeaderText text="Announcements" />
                <Text style={styles.infoText}>Swipe left to see more... ({announcements.value.length} items)</Text>
                <List horizontal announcements={announcements} />
                <HeaderText text="Public Transportation" />
                <TransportationInfo/>
            </ScrollView>
            {errorMessage && <ErrorContainer errorMessage={errorMessage} />}
        </View>
    );
}

export default Feed;
