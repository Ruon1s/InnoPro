import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {reports} from '../mock-data/reports.json';
import FloatingActionButton from '../components/FloatingActionButton';
import {Overlay} from 'react-native-elements';
import * as Location from "expo-location";
import {LocationAccuracy} from "expo-location";
import {LocationState} from "../store/location/types";
import {getLocation} from "../store/location/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import Loading from "../components/Loading";
import AddMarkerForm from "../components/AddMarkerForm";


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
    const { loading, errorMessage } = useSelector((state: RootState) => state.app);

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        if(!visible){
            setVisible(!visible)
        } else {
            setVisible(!visible);
        }
    };
const dispatch = useDispatch();

  useEffect(() => {
  }, []);

 const location = useSelector((state: RootState) => state.location);
  return (
    <View style={styles.container}>
        <AddMarkerForm visibility={visible} onBackdropPress={toggleOverlay}> </AddMarkerForm>



      <MapView
        initialRegion={{
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
      <FloatingActionButton onPress={toggleOverlay} />
    </View>
  );
};

export default Map;
