import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Card from "./Card";
import {useTranslation} from "react-i18next";
import EventList from "./EventList";

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
    let newEvent = {
        id: 0,
        name: "",
        location: "",
        desc: "",
        startTime: "",
        endTime: "",
        startTimeUTC: 0,
        endTimeUTC: 0,
        url: ""
    };
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

            let eventStartTime = "";
            let eventTimeAsString = "";
            let eventStartTimeAsDate = 0;
            if (events.data[i].start_time != null) {
                eventStartTime = events.data[i].start_time;
                const eventTimeSplitWithLine = eventStartTime.split("-");
                const eventTimeSplitWithT = eventTimeSplitWithLine[2].split("T");
                if (eventTimeSplitWithT[1] != undefined) {
                    const eventTimeSplitWithDots = eventTimeSplitWithT[1].split(":");
                    eventTimeAsString = eventTimeSplitWithDots[0] + ":" + eventTimeSplitWithDots[1] + " " + eventTimeSplitWithT[0] + "." + eventTimeSplitWithLine[1] + "." + eventTimeSplitWithLine[0];
                    eventStartTimeAsDate = Date.UTC(Number(eventTimeSplitWithLine[0]), Number(eventTimeSplitWithLine[1]), Number(eventTimeSplitWithT[0]), Number(eventTimeSplitWithDots[1]), Number(eventTimeSplitWithDots[0]));
                } else {
                    eventTimeAsString = eventTimeSplitWithT[0] + "." + eventTimeSplitWithLine[1] + "." + eventTimeSplitWithLine[0];
                    eventStartTimeAsDate = Date.UTC(Number(eventTimeSplitWithLine[0]), Number(eventTimeSplitWithLine[1]), Number(eventTimeSplitWithT[0]));
                }
            }


            let eventEndTime = "";
            let eventEndTimeAsString = "";
            let eventEndTimeAsDate = 0;
            if (events.data[i].end_time != null) {
                eventEndTime = events.data[i].end_time;
                console.log(i + " : " + eventEndTime)
                const eventEndTimeSplitWithLine = eventEndTime.split("-");
                const eventEndTimeSplitWithT = eventEndTimeSplitWithLine[2].split("T");
                if (eventEndTimeSplitWithT[1] != undefined) {
                    const eventEndTimeSplitWithDots = eventEndTimeSplitWithT[1].split(":");
                    eventEndTimeAsString = eventEndTimeSplitWithDots[0] + ":" + eventEndTimeSplitWithDots[1] + " " + eventEndTimeSplitWithT[0] + "." + eventEndTimeSplitWithLine[1] + "." + eventEndTimeSplitWithLine[0];
                    eventEndTimeAsDate = Date.UTC(Number(eventEndTimeSplitWithLine[0]), Number(eventEndTimeSplitWithLine[1]), Number(eventEndTimeSplitWithT[0]), Number(eventEndTimeSplitWithDots[1]), Number(eventEndTimeSplitWithDots[0]));
                } else {
                    eventEndTimeAsString = eventEndTimeSplitWithT[0] + "." + eventEndTimeSplitWithLine[1] + "." + eventEndTimeSplitWithLine[0];
                    eventEndTimeAsDate = Date.UTC(Number(eventEndTimeSplitWithLine[0]), Number(eventEndTimeSplitWithLine[1]), Number(eventEndTimeSplitWithT[0]));
                }
            }

            const currentDateAsString = new Date;
            const currentDate = Date.now();

            console.log(i + " Event name: " + eventName);
            console.log(i + " Event end time: " + eventEndTimeAsDate + " current time: " + currentDate);
            console.log(i + " Event end time as String: " + eventEndTimeAsString + " current time as String: " + currentDateAsString);

            if (eventEndTimeAsDate > currentDate) {
                newEvent = {
                    id: i,
                    name: eventName,
                    location: eventLocation,
                    desc: cleanDesc,
                    startTime: eventTimeAsString,
                    endTime: eventEndTimeAsString,
                    startTimeUTC: eventStartTimeAsDate,
                    endTimeUTC: eventEndTimeAsDate,
                    url: eventUrl
                };
                eventsList.push(newEvent);
                hasEvents = true;
            }
        }
    }

    console.log("Found " + eventsList.length + " current events");

    // @ts-ignore
    eventsList.sort(function (e1, e2) {
        return e1.startTimeUTC > e2.startTimeUTC
    });

    const {t, i18n} = useTranslation();

    if (hasEvents) {
        return (
            <EventList horizontal={true} data={eventsList}/>
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
