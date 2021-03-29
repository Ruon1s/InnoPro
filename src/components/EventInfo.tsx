import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Card from "./Card";
import {useTranslation} from "react-i18next";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
    header: {
        fontSize: 17,
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
    },
    bottom: {
        marginTop: 10
    }
});


const EventInfo: React.FC = () => {
    const events = useSelector((state: RootState) => state.events);
    let newEvent = {name: "", location: "", desc: "", startTime: "", url: ""};
    let eventsList: typeof newEvent[] = [];
    let hasEvents = false;

    if (events.meta.count > 0) {
        for (let i = 0; i < events.data.length; i++) {

            const eventName = events.data[i].name.fi;

            let eventLocation = "";
            if (events.data[i].location_extra_info != null) {
                if (events.data[i].location_extra_info.fi != "") {
                    eventLocation = events.data[i].location_extra_info.fi;
                } else if (events.data[i].location_extra_info.en != "") {
                    eventLocation = events.data[i].location_extra_info.en;
                }
            }

            let eventDesc = "";
            let cleanDesc = "";
            if (events.data[i].short_description != null) {
                if (events.data[i].short_description.fi != "") {
                    eventDesc = events.data[i].short_description.fi;
                } else if (events.data[i].short_description.en != "") {
                    eventDesc = events.data[i].short_description.en;
                } else if (events.data[i].description.fi != "") {
                    eventDesc = events.data[i].description.fi;
                } else if (events.data[i].description.en != "") {
                    eventDesc = events.data[i].description.en;
                }

                /*cleanDesc = eventDesc.replace(/<\/?[^>]+(>|$)/g, " ");*/
            }

            let eventUrl = "";
            if (events.data[i].info_url != null) {
                if (events.data[i].info_url.fi != "") {
                    eventUrl = events.data[i].info_url.fi;
                } else if (events.data[i].info_url.en != "") {
                    eventUrl = events.data[i].info_url.en;
                }
            }

            const eventTime = events.data[i].start_time;
            const eventTimeSplitWithLine = eventTime.split("-");
            const eventTimeSplitWithT = eventTimeSplitWithLine[2].split("T");
            const eventTimeSplitWithDots = eventTimeSplitWithT[1].split(":");
            const eventTimeAsString = eventTimeSplitWithDots[0] + ":" + eventTimeSplitWithDots[1] + " " + eventTimeSplitWithT[0] + "." + eventTimeSplitWithLine[1] + "." + eventTimeSplitWithLine[0];

            const eventTimeAsDate = Date.UTC(Number(eventTimeSplitWithLine[0]), Number(eventTimeSplitWithLine[1]), Number(eventTimeSplitWithT[0]), Number(eventTimeSplitWithDots[1]), Number(eventTimeSplitWithDots[0]));
            const currentDate = Date.now();

            if (eventTimeAsDate > currentDate) {
                newEvent = {
                    name: eventName,
                    location: eventLocation,
                    desc: cleanDesc,
                    startTime: eventTimeAsString,
                    url: eventUrl
                };
                eventsList.push(newEvent);
                hasEvents = true;
            }
        }
    }

    // @ts-ignore
    eventsList.sort(function (e1, e2) {
        return e1.startTime < e2.startTime
    });

    const {t, i18n} = useTranslation();

    if (hasEvents) {
        return (
            <TouchableOpacity onPress={() => void Linking.openURL(eventsList[0].url)}>
                <Card>
                    <Text style={styles.header}>{eventsList[0].name}</Text>

                    <Text>{eventsList[0].location}</Text>
                    <Text>{eventsList[0].startTime}</Text>

                    <Text style={styles.bottom} numberOfLines={3}>{eventsList[0].desc}</Text>
                </Card>
            </TouchableOpacity>
        );
    } else {
        return (
            <Card>
                <Text style={styles.header}>{t('noEvents')}</Text>
            </Card>
        )
    }
};

export default EventInfo;
