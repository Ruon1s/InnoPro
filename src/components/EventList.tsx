import React from 'react';
import {Text, FlatList, Dimensions, Linking, TouchableOpacity, StyleSheet} from 'react-native';
import Card from './Card';

const { width } = Dimensions.get('window');

interface Props {
    data: any[];
    horizontal: boolean;
}

const styles = StyleSheet.create({
    header: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    bottom: {
        marginTop: 10
    }
});

const EventList: React.FC<Props> = ({ data, horizontal }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={item => `${item.id}`}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={width}
            decelerationRate="fast"
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => item.url != ""  ? Linking.openURL(item[0].url) : console.log("No url for event")}>
                <Card>
                    <Text style={styles.header}>{item.name}</Text>
                    <Text>{item.startTime} - {item.endTime}</Text>
                    <Text>{item.location}</Text>
                    <Text numberOfLines={3} style={styles.bottom}>{item.desc}</Text>
                </Card>
                </TouchableOpacity>
            )}
        />
    );
};

export default EventList;
