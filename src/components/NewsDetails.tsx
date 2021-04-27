//Full news component with pictures and full text
import { RouteProp } from '@react-navigation/core';
import React from 'react';
import { Image, Text, Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackParamList } from '../navigators/StackNavigator';
import { formatDate, removeHTMLTags } from '../utils/helpers';

interface Props {
    route: RouteProp<StackParamList, "NewsDetails">;
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    content: {
        padding: 10,
    },
    image: {
        width,
        height: 300
    },
    titleText: {
        paddingBottom: 10,
        fontWeight: "700",
        fontSize: 20
    },
    date: {
        fontStyle: 'italic',
        fontSize: 12,
        color: 'silver',
        paddingBottom: 10,
    }
});

const NewsDetails: React.FC<Props> = ({ route }) => {
    const news = route.params.news;

    //Images come as a <img /> tag, so we are just grabbing the source from the tag to display it in our app
    const extractImageSource = (image: string | undefined): string => {
        if (!image) return "";
        const source = image.split('"');
        return source[1];
    }

    return (
        <ScrollView>
            <Image source={{ uri: extractImageSource(news.details.value.find(item => item.Name === "LiftPicture")?.Text) }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.titleText}>{news.Subject}</Text>
                <Text style={styles.date}>{formatDate(news.CreatedDate)}</Text>
                <Text>{removeHTMLTags(news.details.value.find(item => item.Name === "Content")?.Text)}</Text>
            </View>
        </ScrollView>
    );
};

export default NewsDetails;