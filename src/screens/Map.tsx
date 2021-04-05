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
import {Ionicons} from '@expo/vector-icons';
import {MarkerType} from "../store/markers/types";
import {getMarkers} from "../store/markers/actions";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

/**
 * Map view off the app
 * @constructor
 */

const Map: React.FC = () => {
    //state of the overlay for adding markers
    const [visible, setVisible] = useState(false);

    //function to toggle the overlay on and off
    const toggleOverlay = () => {
        if (!visible) {
            setVisible(!visible)
        } else {
            setVisible(!visible);
        }
    };
    //get markers and location from redux state
    const markers = useSelector((state: RootState) => state.markers);
    const location = useSelector((state: RootState) => state.location);


    /**
     * Renders a marker with a different color icon based on the color attribute of the marker object
     * @param marker
     * @param index
     */
    const renderMarker = (marker: MarkerType, index: number) => {
        if (marker.color === 'red') {
            return (
                <Marker
                    key={index}
                    title={marker.description}
                    coordinate={{
                        latitude: marker.lat,
                        longitude: marker.lon
                    }}
                    image={require('../marker-icons/red_pin.png')}
                />)
        } else if (marker.color === 'yellow') {
            console.log('yellow return');
            return (
                <Marker
                    key={index}
                    title={marker.description}
                    coordinate={{
                        latitude: marker.lat,
                        longitude: marker.lon
                    }}
                    image={require('../marker-icons/yellow_pin.png')}
                />)
        } else {
            return (
                <Marker
                    key={index}
                    title={marker.description}
                    coordinate={{
                        latitude: marker.lat,
                        longitude: marker.lon
                    }}
                    image={require('../marker-icons/green_pin.png')}
                />)
        }
    };
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
                style={styles.map}
                showsMyLocationButton
            >

                {markers.markers.map((marker, index) => (
                    renderMarker(marker, index)
                ))}
                <Marker
                    title={'you'}
                    image={require('../marker-icons/user_pin.png')}
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }}
                />
            </MapView>
            <FloatingActionButton onPress={toggleOverlay}/>
        </View>
    );
}
export default Map;
