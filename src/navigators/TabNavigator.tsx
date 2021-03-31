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
import { fetchNews } from '../store/news/actions';
import { fetchAnnouncements } from '../store/announcements/actions';
import AdminPanel from '../screens/AdminPanel';

type BottomTabParamList = {
  Feed: undefined;
  Map: undefined;
  Search: undefined;
  Profile: undefined;
  Admin: undefined;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);

  useEffect(() => {
    dispatch(getLocation());
    dispatch(fetchNews());
    dispatch(fetchAnnouncements());
  }, []);

  useEffect(() => {
    dispatch(fetchWeather(location.coords.latitude, location.coords.longitude));
  }, [location]);

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'Feed') iconName = 'list';
          if (route.name === 'Map') iconName = 'map';
          if (route.name === 'Search') iconName = 'search';
          if (route.name === 'Admin') iconName = 'hammer';
          if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} color={color} size={size} />
        },
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Admin" component={AdminPanel} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default TabNavigator;