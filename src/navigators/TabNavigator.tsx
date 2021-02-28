import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Map from '../screens/Map';

type BottomTabParamList = {
  Feed: undefined;
  Map: undefined;
  Profile: undefined;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any;

            if (route.name === 'Feed') iconName = 'list';
            if (route.name === 'Map') iconName = 'map';
            if (route.name === 'Profile') iconName = 'person';

            return <Ionicons name={iconName} color={color} size={size} />
          },
        })}
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigator;