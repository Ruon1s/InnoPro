import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Map from '../screens/Map';
import Search from '../screens/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../store/location/actions';
import { RootState } from '../store';
import { fetchWeather } from '../store/weather/actions';
import {useTranslation} from "react-i18next";

type BottomTabParamList = {
  Feed: undefined;
  Map: undefined;
  Search: undefined;
  Profile: undefined;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);

  useEffect(() => {
    dispatch(getLocation());
  }, []);

  useEffect(() => {
    dispatch(fetchWeather(location.coords.latitude, location.coords.longitude));
  }, [location]);

  const { t, i18n } = useTranslation();
  const feedHeader = t('feed');
  const mapHeader = t('map');
  const searchHeader = t('search');
  const profileHeader = t('profile');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'Feed') iconName = 'list';
          if (route.name === 'Map') iconName = 'map';
          if (route.name === "Search") iconName = 'search';
          if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} color={color} size={size} />
        },
      })}
    >
      <Tab.Screen name="Feed" component={Feed} options={{title:feedHeader}}/>
      <Tab.Screen name="Map" component={Map} options={{title:mapHeader}}/>
      <Tab.Screen name="Search" component={Search} options={{title:searchHeader}}/>
      <Tab.Screen name="Profile" component={Profile} options={{title:profileHeader}}/>
    </Tab.Navigator>
  );
}

export default TabNavigator;
