//A Text component for header text, mostly used in the Feed screen/Admin panel
import React from 'react';
import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        fontSize: 28,
        margin: 10,
    },
});

interface Props {
    text: string;
}

const HeaderText: React.FC<Props> = ({text}) => {
    return (
        <Text style={styles.header}>
            {text}
        </Text>
    );
}

export default HeaderText;
