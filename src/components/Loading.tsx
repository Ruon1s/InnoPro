import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    }
});
/**
 * Animation when the application is loading.
 * @constructor
 */
const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="blue"/>
        </View>
    );
};

export default Loading;
