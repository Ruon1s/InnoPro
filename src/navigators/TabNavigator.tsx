import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Map from '../screens/Map';
import Search from '../screens/Search';
import {useDispatch, useSelector} from 'react-redux';
import {getLocation} from '../store/location/actions';
import {RootState} from '../store';
import {fetchWeather} from '../store/weather/actions';
import {useTranslation} from "react-i18next";
import {getMarkers} from "../store/markers/actions";
import AdminPanel from '../screens/AdminPanel';
import { fetchNews } from '../store/news/actions';
import { fetchAnnouncements } from '../store/announcements/actions';


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
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getLocation());
        dispatch(fetchNews());
        dispatch(fetchAnnouncements());
    }, []);

    useEffect(() => {
        if (location.coords !== undefined) {
            dispatch(fetchWeather(location.coords.latitude, location.coords.longitude));
        }
    }, [location]);

    useEffect(() => {
        dispatch(getMarkers());
    }, []);


    const {t, i18n} = useTranslation();
    const feedHeader = t('feed');
    const mapHeader = t('map');
    const searchHeader = t('search');
    const profileHeader = t('profile');

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName: any;

                    if (route.name === 'Feed') iconName = 'list';
                    if (route.name === 'Map') iconName = 'map';
                    if (route.name === 'Search') iconName = 'search';
                    if (route.name === 'Profile') iconName = 'person';
                    if (route.name === 'Admin') iconName = 'hammer';

                    return <Ionicons name={iconName} color={color} size={size}/>
                },
            })}
        >
            <Tab.Screen name="Feed" component={Feed} options={{title: feedHeader}}/>
            <Tab.Screen name="Map" component={Map} options={{title: mapHeader}}/>
            <Tab.Screen name="Search" component={Search} options={{title: searchHeader}}/>
            {user.admin && <Tab.Screen name="Admin" component={AdminPanel}/>}
            <Tab.Screen name="Profile" component={Profile} options={{title: profileHeader}}/>
        </Tab.Navigator>
    );
}

export default TabNavigator;
