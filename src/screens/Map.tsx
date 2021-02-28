import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

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
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

export default Map;
