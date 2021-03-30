import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        height: height / 5,
        width,
    },
    content: {
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        elevation: 5,
        flex: 1,
    }
});

const Card: React.FC = ({children}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

export default Card;
