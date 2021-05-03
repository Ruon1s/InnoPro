import React, {useEffect, useState} from "react";
import {services} from "../mock-data/services.json";
import {StatusBar, FlatList, StyleSheet, TextInput, Text, View} from "react-native";
import SearchList from "../components/SearchList";
import HeaderText from "../components/HeaderText";
import {useTranslation} from "react-i18next";

const Search: React.FC = () => {

    const {t, i18n} = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const filterServices = searchQuery !== '' ? services.filter(service => service.name.toLowerCase().includes(searchQuery.toLowerCase())) : services;

    return (
        <View style={styles.container}>
            <HeaderText text={t("search")}/>
            <TextInput
                style={styles.textInputStyle}
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                underlineColorAndroid="transparent"
                placeholder={t("searchHint")}
            />
            <SearchList data={filterServices}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontWeight: "700",
        fontSize: 28,
        margin: 10,
    },
    textInputStyle: {
        height: 40,
        width: 256,
        borderWidth: 1,
        padding: 10,
        margin: 15,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
});

export default Search;
