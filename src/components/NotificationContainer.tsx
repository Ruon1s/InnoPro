import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { dismissMessage } from '../store/app/actions';
import { NotificationTypes } from '../store/app/types';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width,
        position: 'absolute',
        bottom: 0,
    },
    content: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        color: 'white',
        fontWeight: '700',
    },
    success: {
        backgroundColor: '#20c906'
    },
    error: {
        backgroundColor: '#c90606'
    },
});

interface Props {
    message: string;
    type: NotificationTypes | undefined;
}

/**
 * a custom text element for showing error / success texts
 * @param errorMessage
 * @constructor
 */
const NotificationContainer: React.FC<Props> = ({message, type}) => {
    const dispatch = useDispatch();

    const contentStyles = [
        styles.content,
        type && type === NotificationTypes.Error ? styles.error : styles.success
    ]

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => dispatch(dismissMessage())} style={contentStyles}>
                <Text numberOfLines={1} style={styles.text}>
                    {message}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default NotificationContainer;
