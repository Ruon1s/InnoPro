// Component for list items in admin panel for markers

import React from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setNotificationMessage } from '../store/app/actions';
import { NotificationTypes } from '../store/app/types';
import { removeMarker } from '../store/markers/actions';
import { MarkerType } from '../store/markers/types';
import CustomButton from './CustomButton';
import {useTranslation} from "react-i18next";

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
    },
    content: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        flex: 2,
    },
    button: {
        flex: 1,
    },
});

interface Props {
    item: MarkerType;
}

const AdminPanelListItem: React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch();

    const {t, i18n} = useTranslation();

    const confirm = (itemId: string | undefined) => {
        if (itemId) {
            Alert.alert(t("deletingMarker"), t("markerDeleteVerification"), [
                {
                    text: t("cancel"), onPress: () => console.log('Dismissed'), style: 'cancel'
                },
                {
                    text: t("delete"), onPress: () => dispatch(removeMarker(itemId)), style: 'default'
                }
            ]);
        } else {
            dispatch(setNotificationMessage(t("noID"), NotificationTypes.Error ,5));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.description}>
                    <Text>{t("type")}: {item.color}</Text>
                    <Text>{t("description")}: {item.description}</Text>
                </View>
                {item.id &&
                <View style={styles.button}>
                    <CustomButton transparent danger onPress={() => confirm(item.id)} title={t("delete")} />
                </View>}
            </View>
        </View>
    )
}

export default AdminPanelListItem;
