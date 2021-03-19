import React from 'react';
import { FlatList, Dimensions, Text } from 'react-native';
import { AnnouncementState } from '../store/announcements/types';
import { NewsState } from '../store/news/types';
import AnnouncementItem from './AnnouncementItem';
import NewsItem from './NewsItem';

const { width } = Dimensions.get('window');

interface Props {
  news?: NewsState;
  announcements?: AnnouncementState;
  horizontal: boolean;
}

const List: React.FC<Props> = ({ news, announcements, horizontal }) => {

  const renderItem = (item: any) => {
    if (news) {
      return <NewsItem news={item} />
    }

    if (announcements) {
      return <AnnouncementItem announcement={item} />
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