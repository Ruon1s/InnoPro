import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Card from './Card';
import {Ionicons} from '@expo/vector-icons';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import * as Linking from 'expo-linking'
import {useTranslation} from "react-i18next";

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        marginLeft: 10,
    },
    header: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    right: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

const TransportationInfo: React.FC = () => {
    const transport = useSelector((state: RootState) => state.transport);
    let stopNames: String[] = [];
    let stopDistances: String[] = [];

    transport.stations.stopsByRadius.edges.forEach(stop => {
            if (!stopNames.includes(stop.node.stop.name)) {
                stopNames.push(stop.node.stop.name);
                stopDistances.push(stop.node.distance.toString())
            }
        }
    );

    let serviceDay = transport.departures.stop.stoptimesWithoutPatterns[0].serviceDay;
    let departureTime = transport.departures.stop.stoptimesWithoutPatterns[0].scheduledDeparture;
    let time = new Date();
    time.setSeconds(serviceDay + departureTime);

    const {t, i18n} = useTranslation();

    return (
        <TouchableOpacity onPress={() => void Linking.openURL("https://reittiopas.hsl.fi/")}>
            <Card>
                <Text style={styles.header}>{t('closestStations')}</Text>
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Ionicons name="bus" size={30}/>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.text}>{stopNames[0] ?? ""}</Text>
                        <Text style={styles.text}>{stopDistances[0]}m {t('away')}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Ionicons name="bus" size={30}/>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.text}>{stopNames[1] ?? ""}</Text>
                        <Text style={styles.text}>{stopDistances[1]}m {t('away')}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Ionicons name="bus" size={30}/>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.text}>{stopNames[2] ?? ""}</Text>
                        <Text style={styles.text}>{stopDistances[2]}m {t('away')}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

export default TransportationInfo;
