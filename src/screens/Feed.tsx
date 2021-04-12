import React from 'react';
import {ScrollView, StatusBar, StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import WeatherInfo from '../components/WeatherInfo';
import List from '../components/List';
import TransportationInfo from '../components/TransportationInfo';
import EventInfo from '../components/EventInfo'
import HeaderText from '../components/HeaderText';
import { RootState } from '../store';
import NotificationContainer from '../components/NotificationContainer';
import {useTranslation} from 'react-i18next'

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
    const notification = useSelector((state: RootState) => state.app.notification);
    const user = useSelector((state: RootState) => state.user);
    const announcements = useSelector((state: RootState) => state.announcements);
    const news = useSelector((state: RootState) => state.news);
    const {t, i18n} = useTranslation();

    return (
        <View style={styles.container}>
            <HeaderText text={`${t('hello')}, ${user.fullName.split(' ')[0]}`}/>
            <ScrollView>
                <HeaderText text={t("weather")} />
                <WeatherInfo/>
                {news.value.length > 0 &&
                <>
                    <HeaderText text={t("news")} />
                    <Text style={styles.infoText}>Swipe left to see more... ({news.value.length} items)</Text>
                    <List horizontal news={news} />
                </>}
                {announcements.value.length > 0 &&
                <>
                    <HeaderText text={t("announcements")} />
                    <Text style={styles.infoText}>Swipe left to see more... ({announcements.value.length} items)</Text>
                    <List horizontal announcements={announcements} />
                </>}
                <HeaderText text={t("events")} />
                <EventInfo />
                <HeaderText text={t("publicTransport")} />
                <TransportationInfo/>
            </ScrollView>
            {notification.message && <NotificationContainer type={notification.type} message={notification.message} />}
        </View>
    );
};

export default Feed;
