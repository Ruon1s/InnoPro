import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import {Ionicons} from '@expo/vector-icons';
import {useSelector} from "react-redux";
import {RootState} from "../store";

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
    const transport = useSelector((state: RootState) => state.transport);
    let stopNames: String[] = [];
    let stopDistances: String[] = [];

    transport.data.stopsByRadius.edges.forEach(stop => {
            if (!stopNames.includes(stop.node.stop.name)) {
                stopNames.push(stop.node.stop.name);
                stopDistances.push(stop.node.distance.toString())
            }
        }
    );

    return (
        <Card>
            <View style={styles.row}>
                <Ionicons name="bus" size={30}/>
                <Text style={styles.text}>{stopNames[0] ?? ""}</Text>
                <Text style={styles.text}>{stopDistances[0]}m away</Text>
            </View>
            <View style={styles.row}>
                <Ionicons name="bus" size={30}/>
                <Text style={styles.text}>{stopNames[1] ?? ""}</Text>
                <Text style={styles.text}>{stopDistances[1]}m away</Text>
            </View>
            <View style={styles.row}>
                <Ionicons name="bus" size={30}/>
                <Text style={styles.text}>{stopNames[2] ?? ""}</Text>
                <Text style={styles.text}>{stopDistances[2]}m away</Text>
            </View>
        </Card>
    );
};

export default TransportationInfo;
