import React, {useEffect} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {useDispatch, useSelector} from "react-redux";
import {fetchWeather} from "../store/weather/actions";
import {getLocation} from "../store/location/actions";
import {RootState} from "../store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const Map: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocation());
  });
  [];
  const location = useSelector((state: RootState) => state.location);
  return (
    <View style={styles.container}>
      <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={styles.map} />
    </View>
  );
};

export default Map;
