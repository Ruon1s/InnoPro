import React from 'react';
import {Text, View, StyleSheet, StatusBar, Image, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import NotificationContainer from '../components/NotificationContainer';
import {signOut} from '../store/user/actions';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigators/StackNavigator';
import {Formik} from 'formik';
import InputField from '../components/InputField';
import * as yup from 'yup';
import i18n from '../i18n';
import {useTranslation} from 'react-i18next'
import useProfile from '../hooks/profileHook';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
    profilePicContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    userInfo: {
        flex: 2,
        backgroundColor: '#FFFFFF',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        padding: 20,
        elevation: 5,
    },
    titleText: {
        fontWeight: '600',
        fontSize: 18,
        paddingBottom: 10,
    },
    signOutContainer: {
        position: 'absolute',
        bottom: 0,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rows: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
});

const validationSchema = yup.object().shape({
    fullName: yup.string().min(3).max(40).required('This field cannot be empty'),
    email: yup.string().email().required('This field cannot be empty'),
});

interface Props {
    navigation: StackNavigationProp<StackParamList, 'Main'>;
}

const Profile: React.FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const city = useSelector((state: RootState) => state.location.city)
    const {loading, notification} = useSelector((state: RootState) => state.app);
    const {
        isEditing,
        imageUri,
        initialValues,
        setIsEditing,
        pickImage,
        handleUserUpdate,
        cancelEdit
    } = useProfile(user);

    const {t, i18n} = useTranslation();

    const changeLanguage = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('fi');
        } else {
            i18n.changeLanguage('en');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profilePicContainer}>
                {imageUri ? <Image source={{uri: imageUri}} style={styles.avatar}/> :
                    <Ionicons name="person" size={100}/>}
                {isEditing && <CustomButton transparent title={t("changeProfilePic")} onPress={pickImage}/>}
            </View>
            <View style={styles.userInfo}>
                {isEditing ?
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleUserUpdate(values)}
                        validationSchema={validationSchema}
                    >
                        {({handleSubmit}) => (
                            <>
                                <View style={styles.rows}>
                                    <Text>{t("name")}: </Text>
                                    <InputField name="fullName" placeholder="Full name" fullWidth
                                                autoCapitalize="words"/>
                                </View>
                                <View style={styles.rows}>
                                    <Text>{t("email")}: </Text>
                                    <InputField name="email" placeholder="Email" fullWidth
                                                keyboardType="email-address"/>
                                </View>
                                <View style={styles.signOutContainer}>
                                    {loading && !isEditing ?
                                        <Loading/>
                                        :
                                        <>
                                            <CustomButton title={t("save")} onPress={handleSubmit}/>
                                            <CustomButton title={t("cancel")} onPress={cancelEdit} transparent danger/>
                                        </>}
                                </View>
                            </>
                        )}
                    </Formik>
                    :
                    <>
                        <Text style={styles.titleText}>{t("name")}: {user.fullName}</Text>
                        <Text style={styles.titleText}>{t("email")}: {user.email} </Text>
                        <Text style={styles.titleText}>{t("joined")}: {new Date(user.createdAt).toDateString()}</Text>
                        {city && city !== '' && <Text style={styles.titleText}>{t("currentLocation")} :  {city}</Text>}
                    </>}
                <View style={styles.signOutContainer}>
                    {!isEditing &&
                    <>
                        <CustomButton title={t("changeLanguage")} onPress={() => changeLanguage()} transparent/>
                        <CustomButton title={t("editProfile")} onPress={() => setIsEditing(true)} transparent/>
                        <CustomButton title={t("signOut")} onPress={() => dispatch(signOut(navigation))} transparent danger/>
                    </>}
                </View>
                {notification.message && <NotificationContainer type={notification.type} message={notification.message}/>}
            </View>
        </View>
    );
}

export default Profile;
