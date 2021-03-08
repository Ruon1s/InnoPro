import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    marginLeft: 10,
  }
});

const TransportationInfo: React.FC = () => {
  return (
    <Card>
      <View style={styles.row}>      
        <Text>555</Text>
        <Ionicons name="bus" size={30} />
        <Text style={styles.text}>Leaves at 20:18 from Leppävaara</Text>
      </View>
      <View style={styles.row}>
        <Text>E</Text>
        <Ionicons name="train" size={30} />
        <Text style={styles.text}>Leaves at 19:54 from Leppävaara</Text>
      </View>
      <View style={styles.row}>
        <Text>200</Text>
        <Ionicons name="bus" size={30} />
        <Text style={styles.text}>Leaves at 20:08 from Leppävaara</Text>
      </View>
    </Card>
  );
}

export default TransportationInfo;