import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import WeatherInfo from '../components/WeatherInfo';
import { events } from '../mock-data/events.json';
import { annoucements } from '../mock-data/announcements.json';
import List from '../components/List';
import TransportationInfo from '../components/TransportationInfo';
import HeaderText from '../components/HeaderText';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});

const Feed: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <View style={styles.container}>
      <HeaderText text={`Hello, ${user.fullName.split(' ')[0]}`} />
      <ScrollView>
        <HeaderText text="Weather" />
        <WeatherInfo />
        <HeaderText text="Announcements" />
        <List horizontal={true} data={annoucements} />
        <HeaderText text="Events" />
        <List horizontal={true} data={events} />
        <HeaderText text="Public Transportation" />
        <TransportationInfo />
      </ScrollView>
    </View>
  );
}

export default Feed;