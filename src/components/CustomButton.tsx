import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    title: {
        color: 'white',
        fontWeight: '700'
    },
    transparentButton: {
        backgroundColor: 'transparent',
    },
    transparentTitle: {
        color: 'blue'
    },
    dangerText: {
        color: '#d73a4a'
    }
});

interface Props {
    title: string;
    onPress: (args?: any) => void;
    transparent?: boolean;
    danger?: boolean;
}

/**
 * a custom button element for the whole application
 * @param title
 * @param onPress
 * @param transparent
 * @param danger
 * @constructor
 */
const CustomButton: React.FC<Props> = ({title, onPress, transparent, danger}) => {
    const buttonStyles = [
        styles.button,
        transparent && styles.transparentButton
    ];

    const titleStyles = [
        styles.title,
        transparent && styles.transparentTitle,
        danger && styles.dangerText,
    ];

    return (
        <View style={styles.container}>
            <TouchableOpacity style={buttonStyles} onPress={onPress}>
                <Text style={titleStyles}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default CustomButton;
