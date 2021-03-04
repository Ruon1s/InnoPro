import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import WeatherInfo from '../components/WeatherInfo';
import { fetchWeather } from '../store/weather/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});

const Feed: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch(fetchWeather(position.coords.latitude, position.coords.longitude));
    });
  }, []);

  return (
    <View style={styles.container}>
      <WeatherInfo />
    </View>
  );
}

export default Feed;