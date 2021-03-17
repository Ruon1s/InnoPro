import React from 'react';
import { Text, FlatList, Dimensions } from 'react-native';
import Card from './Card';

const { width } = Dimensions.get('window');

interface Props {
  data: any[];
  horizontal: boolean;
}

const List: React.FC<Props> = ({ data, horizontal }) => {
  return (
    <FlatList 
      data={data}
      keyExtractor={item => `${item.id}`}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={width}
      decelerationRate="fast"
      renderItem={({ item }) => (
        <Card>
          <Text>{item.name || item.title}</Text>
          <Text>{item.where || item.body}</Text>
          <Text>{item.when}</Text>
        </Card>
      )}
    />
  );
}

export default List;