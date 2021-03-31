import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { UserState } from '../store/user/types';
import { db } from '../utils/firebaseConfig';
import { Formik } from 'formik';
import InputField from '../components/InputField';
import * as yup from 'yup';
import HeaderText from '../components/HeaderText';

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight
  },
});

const validationSchema = yup.object().shape({
  title: yup.string().min(3).max(20).required('Title is required'),
  message: yup.string().min(5).max(160).required('Message is required')
});

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserState[]>([]);

  const fetchAllUsers = async () => {
    try {
      const usersFromDb = await db.users.get();

      usersFromDb.forEach(user => {
        const userData = user.data();

        if (userData.notificationToken && userData.notificationToken !== '') {
          setUsers(prevState => ([
            ...prevState,
            userData,
          ]));
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const sendNotification = async (values: { title: string, message: string }) => {
    try {
      users.forEach(async user => {
        if (user.notificationToken && user.notificationToken !== '') {
          const message = {
            to: user.notificationToken,
            sound: 'default',
            title: values.title,
            body: values.message,
          };

          const options = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          }

          await fetch('https://exp.host/--/api/v2/push/send', options);
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const initialValues = {
    title: '',
    message: '',
  }

  return (
    <View style={styles.container}>
      <HeaderText text="Send a Notifiation to All the Users" />
      <Formik
        initialValues={initialValues}
        onSubmit={values => sendNotification(values)}
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
    </View>
  );
}

export default AdminPanel;