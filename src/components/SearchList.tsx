import React from 'react';
import { Text, FlatList, Dimensions } from 'react-native';
import SearchCard from './SearchCard';

const { width } = Dimensions.get('window');

interface Props {
  data: any[];
}

const SearchList: React.FC<Props> = ({ data }) => {
  return (
    <FlatList 
      data={data}
      keyExtractor={item => `${item.id}`}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={width}
      decelerationRate="fast"
      renderItem={({ item }) => (
        <SearchCard>
          <Text>{item.name}</Text>
          <Text>{item.Phone}</Text>
          <Text>{item.Address}</Text>
        </SearchCard>
      )}
    />
  );
}

export default SearchList;