import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useTranslation} from "react-i18next";
import Card from "./Card";
import Loading from "./Loading";

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 2
    },
    right: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
        margin: 2
    },
    bottom: {
        marginTop: 20
    }
});


const EventInfo: React.FC = () => {
    const events = useSelector((state: RootState) => state.events);
    const {loading} = useSelector((state: RootState) => state.app);
    let eventsList = [];

    for(let i = 0; i < events.data.length; i++){
        const eventName = events.data[i].name.fi;
        const eventLocation = events.data[i].location_extra_info.fi;
        const eventDesc = events.data[i].description.fi;
        const eventTime = events.data[i].start_time;
        let newEvent = {name: eventName, location: eventLocation, desc: eventDesc, time: eventTime};
        eventsList.push(newEvent);
    }

    return (
        <Card>
            {loading ?
                <Loading/>
                :
                <>
                    <View style={styles.left}>
                        <Text style={styles.header}>{eventsList[0].name}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text>{eventsList[0].location}</Text>
                        <Text>{eventsList[0].time}</Text>
                    </View>
                    <Text style={styles.bottom}>{eventsList[0].desc}</Text>
                </>}
        </Card>
    );
};


export default EventInfo;
