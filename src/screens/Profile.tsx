import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import ErrorContainer from '../components/ErrorContainer';
import { signOut } from '../store/user/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../navigators/StackNavigator';

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
  signOutContainer: {
    position: 'absolute',
    bottom: 0,
  }
});

interface Props {
  navigation: StackNavigationProp<StackParamList, 'Main'>;
}

const Profile: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { loading, errorMessage } = useSelector((state: RootState) => state.app);

  return (
    loading ?
    <Loading />
    :
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Ionicons name="person" size={100} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.titleText}>Name: {user.fullName}</Text>
        <Text style={styles.titleText}>Email: {user.email} </Text>
        {errorMessage && <ErrorContainer errorMessage={errorMessage} />}
        <View style={styles.signOutContainer}>
          <CustomButton title="Sign out" onPress={() => dispatch(signOut(navigation))} transparent danger />
        </View>
      </View>
    </View>
  );
}

export default Profile;