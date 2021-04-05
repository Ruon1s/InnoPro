// Component for list items in admin panel for markers

import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setErrorMessage } from '../store/app/actions';
import { removeMarker } from '../store/markers/actions';
import { MarkerType } from '../store/markers/types';
import CustomButton from './CustomButton';

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  content: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  description: {
    flex: 2,
  },
  button: {
    flex: 1,
  }
})

interface Props {
  item: MarkerType;
}

const AdminPanelListItem: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();

  const confirm = (itemId: string | undefined) => {
    if (itemId) {
      Alert.alert('Deleting a marker', 'Are you sure you want to delete this marker?', [
        {
          text: 'Cancel', onPress: () => console.log('Dismissed'), style: 'cancel'
        },
        {
          text: 'Delete', onPress: () => dispatch(removeMarker(itemId)), style: 'default'
        }
      ]);
    } else {
      dispatch(setErrorMessage('This item does not have an ID', 5));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.description}>
          <Text>{item.description}</Text>
        </View>
        {item.id &&
        <View style={styles.button}>   
          <CustomButton transparent danger onPress={() => confirm(item.id)} title="Delete" />
        </View>}
      </View>
    </View>
  )
}

export default AdminPanelListItem;