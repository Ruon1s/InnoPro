import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { StackParamList } from '../navigators/StackNavigator';
import { News } from '../store/news/types';
import { formatDate, removeHTMLTags } from '../utils/helpers';
import Card from './Card';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    subject: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 2,
    },
    date: {
        fontStyle: 'italic',
        fontSize: 12,
        color: 'silver'
    },
    content: {
        fontSize: 14,
    },
    top: {
        flex: 1,
        marginBottom: 5,
    },
    bottom: {
        flex: 2,
        justifyContent: 'center',
    }
});

interface Props {
    news: News;
    navigation: StackNavigationProp<StackParamList, 'Main'>;
}

const NewsItem: React.FC<Props> = ({ news, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('NewsDetails', { news })}>
            <Card>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <Text numberOfLines={2} style={styles.subject}>{news.Subject}</Text>
                        <Text style={styles.date}>{formatDate(news.CreatedDate)}</Text>
                    </View>
                    <View style={styles.bottom}>
                        <Text numberOfLines={3} style={styles.content}>
                            {removeHTMLTags(news.details.value.find(item => item.Name === "LiftContent")?.Text)}
                        </Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
}

export default NewsItem;