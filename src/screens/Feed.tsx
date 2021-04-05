import React, {useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WeatherInfo from '../components/WeatherInfo';
import List from '../components/List';
import TransportationInfo from '../components/TransportationInfo';
import EventInfo from '../components/EventInfo'
import {fetchTransport} from "../store/transportation/actions";
import HeaderText from '../components/HeaderText';
import { RootState } from '../store';
import ErrorContainer from '../components/ErrorContainer';
import {useTranslation} from 'react-i18next'
import {fetchEvents} from "../store/events/actions";

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
    const {t, i18n} = useTranslation();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            dispatch(fetchTransport(position.coords.latitude, position.coords.longitude));
            dispatch(fetchEvents(position.coords.latitude, position.coords.longitude));
        });
    }, []);

    return (
        <View style={styles.container}>
            <HeaderText text={`${t('hello')}, ${user.fullName.split(' ')[0]}`}/>
            <ScrollView>
                <HeaderText text={t("Weather")} />
                <WeatherInfo/>
                {news.value.length > 0 &&
                <>
                    <HeaderText text={t("News")} />
                    <Text style={styles.infoText}>Swipe left to see more... ({news.value.length} items)</Text>
                    <List horizontal news={news} />
                </>}
                {announcements.value.length > 0 && 
                <>
                    <HeaderText text={t("Announcements")} />
                    <Text style={styles.infoText}>Swipe left to see more... ({announcements.value.length} items)</Text>
                    <List horizontal announcements={announcements} />
                </>}
                <HeaderText text={t("events")} />
                <EventInfo />
                <HeaderText text={t("Public Transportation")} />
                <TransportationInfo/>
            </ScrollView>
            {errorMessage && <ErrorContainer errorMessage={errorMessage} />}
        </View>
    );
};

export default Feed;
