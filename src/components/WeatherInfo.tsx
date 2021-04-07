import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import Card from './Card';
import Loading from './Loading';
import {useTranslation} from "react-i18next";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    townName: {
        fontWeight: '700',
    },
    weatherImg: {
        width: 40,
        height: 40,
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
    }
});

/**
 * Weather panel based on your location
 * @constructor
 */

const WeatherInfo: React.FC = () => {
    // get weather and loading state from redux
    const weather = useSelector((state: RootState) => state.weather);
    const {loading} = useSelector((state: RootState) => state.app);
    //multi language
    const {t, i18n} = useTranslation();
    return (
        <Card>
            {loading ?
                <Loading/>
                :
                <>
                    <View style={styles.container}>
                        <View style={styles.left}>
                                <Text style={styles.townName}>{weather.name || ''} </Text>
                                {weather.weather && <Text>{weather.weather[0].description  || ''} </Text>}
                                <Text>{t('current')} {weather.main.temp  || 0} °C </Text>
                                <Text>Max. {weather.main.temp_max || 0} °C </Text>
                                <Text>Min. {weather.main.temp_min || 0} °C </Text>
                        </View>
                        <View style={styles.right}>
                                <Image style={styles.weatherImg}
                                        source={{uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}}/>
                                <Text>{t('humidity')} {weather.main.humidity || 0}</Text>
                                <Text>{t('pressure')} {weather.main.pressure || 0}</Text>
                                <Text>{t('wind')} {weather.wind.speed || 0} m/s</Text>
                        </View>
                    </View>
              </>}
        </Card>
    );
}


export default WeatherInfo;
