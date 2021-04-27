import { ImagePicker } from "expo";
import { useState } from "react";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { setNotificationMessage, toggleLoading } from "../store/app/actions";
import { UserState } from "../store/user/types";
import firebase from 'firebase';
import 'firebase/storage';
import { UpdateUserValues } from "../types";
import { updateUser } from "../store/user/actions";
import { NotificationTypes } from "../store/app/types";

const useProfile = (user: UserState) => {
    const dispatch = useDispatch();
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
            dispatch(setNotificationMessage('Permissions not granted', NotificationTypes.Error, 5));
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
            dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
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
                } else {
                    delete newValues.avatarUrl;
                }

                dispatch(updateUser(newValues));
                setIsEditing(false);
            } else {
                dispatch(toggleLoading(false));
                dispatch(setNotificationMessage('Invalid current user', NotificationTypes.Error, 5));
            }
        } catch (error) {
            dispatch(toggleLoading(false));
            dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
        }
    }

    const cancelEdit = () => {
        setImageUri(initialValues.avatarUrl);
        setIsEditing(false);
    }

    return {
        isEditing,
        imageUri,
        initialValues,
        setIsEditing,
        pickImage,
        handleUserUpdate,
        cancelEdit,
    }
}

export default useProfile;
