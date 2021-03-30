import React, {useState} from 'react';
import {Text, View, StyleSheet, StatusBar, Platform, Image, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import ErrorContainer from '../components/ErrorContainer';
import {signOut, updateUser} from '../store/user/actions';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigators/StackNavigator';
import * as ImagePicker from 'expo-image-picker';
import {setErrorMessage, toggleLoading} from '../store/app/actions';
import firebase from 'firebase';
import 'firebase/storage';
import {Formik} from 'formik';
import {UpdateUserValues} from '../types';
import InputField from '../components/InputField';
import * as yup from 'yup';
import i18n from '../i18n';
import {useTranslation} from 'react-i18next'

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
    const {loading, errorMessage} = useSelector((state: RootState) => state.app);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [imageUri, setImageUri] = useState<string | undefined>(user.avatarUrl);

    const initialValues: UpdateUserValues = {
        fullName: user.fullName,
        email: user.email,
        avatarUrl: user.avatarUrl,
    }

    const pickImage = async () => {
        try {
            if (Platform.OS !== 'web') {
                const status = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (!status.granted) {
                    dispatch(setErrorMessage('Permissions not granted', 5));
                } else {
                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    });

                    if (!result.cancelled) {
                        setImageUri(result.uri);
                    }
                }
            }
        } catch (error) {
            dispatch(setErrorMessage(error.message, 5));
        }
    }

    const handleUserUpdate = async (values: UpdateUserValues) => {
        try {
            dispatch(toggleLoading(true));
            const userId = firebase.auth().currentUser?.uid;
            let newValues = {...values};

            if (userId) {
                if (imageUri && user.avatarUrl !== imageUri) {
                    const storageRef = firebase.storage().ref(`/users/${userId}/avatar.jpg`);
                    const image = await fetch(imageUri);
                    const blob = await image.blob();

                    await storageRef.put(blob);
                    const avatarUrl = await storageRef.getDownloadURL();

                    newValues = {...newValues, avatarUrl};
                }

                dispatch(updateUser(newValues));
                setIsEditing(false);
            } else {
                dispatch(toggleLoading(false));
                dispatch(setErrorMessage('Invalid current user', 5));
            }
        } catch (error) {
            dispatch(toggleLoading(false));
            dispatch(setErrorMessage(error.message, 5));
        }
    }

    const cancelEdit = () => {
        setImageUri(initialValues.avatarUrl);
        setIsEditing(false);
    }

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
                                    {loading ?
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
                    </>}
                <View style={styles.signOutContainer}>
                    {!isEditing &&
                    <>
                        <CustomButton title={t("changeLanguage")} onPress={() => changeLanguage()} transparent/>
                        <CustomButton title={t("editProfile")} onPress={() => setIsEditing(true)} transparent/>
                        <CustomButton title={t("signOut")} onPress={() => dispatch(signOut(navigation))} transparent
                                      danger/>
                    </>}
                </View>
                {errorMessage && <ErrorContainer errorMessage={errorMessage}/>}
            </View>
        </View>
    );
}

export default Profile;
