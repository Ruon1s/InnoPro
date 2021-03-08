import React, {useEffect} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../store/location/actions";
import { RootState } from "../store";
import { reports } from '../mock-data/reports.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }, []);

  const location = useSelector((state: RootState) => state.location);
  
  return (
    <View style={styles.container}>
      <MapView
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.map}>
            {reports.map(report => (
              <Marker 
                key={report.id}
                coordinate={{
                  latitude: report.location.latitude,
                  longitude: report.location.longitude
                }} 
              />
            ))}
          </MapView>
    </View>
  );
};

export default Map;
