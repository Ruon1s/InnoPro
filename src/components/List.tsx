//Flatlist for mainly the sideways scrolling stuff

import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import { StackParamList } from '../navigators/StackNavigator';
import { AnnouncementState } from '../store/announcements/types';
import { MarkerState } from '../store/markers/types';
import { NewsState } from '../store/news/types';
import AdminPanelListItem from './AdminPanelListItem';
import AnnouncementItem from './AnnouncementItem';
import NewsItem from './NewsItem';

const {width} = Dimensions.get('window');

interface Props {
    news?: NewsState;
    announcements?: AnnouncementState;
    markers?: MarkerState;
    horizontal?: boolean;
    navigation?: StackNavigationProp<StackParamList, "Main">;
}

const List: React.FC<Props> = ({ news, announcements, markers, horizontal, navigation }) => {

    const renderItem = (item: any): JSX.Element | null => {
        if (news) {
            return <NewsItem navigation={navigation!} news={item} />
        }

        if (announcements) {
            return <AnnouncementItem announcement={item} />
        }

        if (markers) {
            return <AdminPanelListItem item={item} />
        }

        return null;
    }

    return (
        <FlatList 
            data={news?.value || announcements?.value || undefined}
            keyExtractor={item => `${item.ContentId}`}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={width}
            decelerationRate="fast"
            renderItem={({ item }) => renderItem(item)}
        />
    );
}

export default List;
