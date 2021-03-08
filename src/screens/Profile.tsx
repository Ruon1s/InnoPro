import React from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  profilePicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  userInfo: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 20,
    elevation: 5,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 18,
    paddingBottom: 10,
  },
});

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Ionicons name="person" size={100} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.titleText}>Name: John Doe</Text>
        <Text style={styles.titleText}>Current Position: Leppävaara</Text>
        <Text style={styles.titleText}>Joined: 07/03/2021</Text>
        <Text style={styles.titleText}>Interests: beer, fast food</Text>
      </View>
    </View>
  );
}

export default Profile;