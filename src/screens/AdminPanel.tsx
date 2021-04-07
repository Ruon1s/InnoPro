import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { Formik } from 'formik';
import InputField from '../components/InputField';
import * as yup from 'yup';
import HeaderText from '../components/HeaderText';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { FlatList } from 'react-native-gesture-handler';
import AdminPanelListItem from '../components/AdminPanelListItem';
import { GroupMessageValues } from '../types';
import useAdmin from '../hooks/adminHook';
import NotificationContainer from '../components/NotificationContainer';
import { setNotificationMessage } from '../store/app/actions';
import { NotificationTypes } from '../store/app/types';
import { getCurrentLocationName } from '../store/location/actions';

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
    separator: {
        backgroundColor: 'silver',
        height: 0.5,
        marginLeft: 10,
        marginRight: 10,
    },
    flatList: {
        paddingBottom: 10,
    },
    emptyListText: {
        alignSelf: 'center',
        color: 'silver',
    },
    inputField: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 5,
        margin: 10,
    },
    divider: {
        height: 1,
        backgroundColor: 'black'
    },
    cityText: {
        paddingLeft: 10,
    }
});

const validationSchema = yup.object().shape({
    title: yup.string().min(3).max(20).required('Title is required'),
    message: yup.string().min(5).max(160).required('Message is required')
});

const initialValues: GroupMessageValues = {
    title: '',
    message: '',
}

const AdminPanel: React.FC = () => {
    const notification = useSelector((state: RootState) => state.app.notification);
    const markers = useSelector((state: RootState) => state.markers);
    const city = useSelector((state: RootState) => state.location.city);
    const { latitude, longitude } = useSelector((state: RootState) => state.location.coords);
    const dispatch = useDispatch();
    const {sendGroupNotification, handleSearch, filter} = useAdmin();

    const filteredMarkers = filter ? markers.markers.filter(marker => marker.description.toLowerCase().includes(filter.toLowerCase())) : markers.markers;

    return (
        <View style={styles.container}>
            <HeaderText text="Send a Notifiation to All the Users" />
            <Formik
                initialValues={initialValues}
                onSubmit={values => sendGroupNotification(values)}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, resetForm }) => (
                <>
                    <InputField name="title" placeholder="Notification title" />
                    <InputField name="message" placeholder="Notification message" />
                    <CustomButton title="Send a Notification" onPress={handleSubmit} />
                    <CustomButton title="Reset fields" transparent danger onPress={resetForm} />
                </>
                )}
            </Formik>
            <View style={styles.divider} />
            <HeaderText text="Clear a marker" />
            <TextInput placeholder="Search" onChangeText={handleSearch} style={styles.inputField} />
            <FlatList 
                contentContainerStyle={styles.flatList}
                data={filteredMarkers}
                keyExtractor={item => `${item.id!}`}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => <AdminPanelListItem item={item} />}
                ListEmptyComponent={() => <Text style={styles.emptyListText}>No markers found</Text>}
            />
            <View style={styles.divider} />
            <HeaderText text="Your current location" />
            <Text style={styles.cityText}>{city || 'Can not get the location'}</Text>
            <CustomButton title="Refetch your location" onPress={() => dispatch(getCurrentLocationName(latitude, longitude))} />
            {notification.message && <NotificationContainer type={notification.type} message={notification.message} />}
        </View>
    );
}

export default AdminPanel;