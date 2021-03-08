import React from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Card from './Card';

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