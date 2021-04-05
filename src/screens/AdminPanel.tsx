import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { Formik } from 'formik';
import InputField from '../components/InputField';
import * as yup from 'yup';
import HeaderText from '../components/HeaderText';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FlatList } from 'react-native-gesture-handler';
import AdminPanelListItem from '../components/AdminPanelListItem';
import { GroupMessageValues } from '../types';
import useAdmin from '../hooks/adminHook';

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
  const markers = useSelector((state: RootState) => state.markers);
  const {sendGroupNotification} = useAdmin();

  return (
    <View style={styles.container}>
      <HeaderText text="Send a Notifiation to All the Users" />
      <Formik
        initialValues={initialValues}
        onSubmit={values => sendGroupNotification(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <InputField name="title" placeholder="Notification title" />
            <InputField name="message" placeholder="Notification message" />
            <CustomButton title="Send a Notification" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <HeaderText text="Clear a marker" />
      <FlatList 
        contentContainerStyle={styles.flatList}
        data={markers.markers}
        keyExtractor={item => `${item.id!}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <AdminPanelListItem item={item} />}
      />
    </View>
  );
}

export default AdminPanel;