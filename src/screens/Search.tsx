import React, {useEffect} from "react";
import {services} from "../mock-data/services.json";
import InputField from "../components/InputField";
import {StatusBar, FlatList, StyleSheet, TextInput, Text, View} from "react-native";
import SearchList from "../components/SearchList";
import HeaderText from "../components/HeaderText";
import SearchBar from "react-native-elements";
import {useTranslation} from "react-i18next";

const Search: React.FC = () => {

    const {t, i18n} = useTranslation();

    return (
        <View style={styles.container}>
            <HeaderText text={t("search")}/>
            <TextInput
                style={styles.textInputStyle}
                //Add search functionality here or something
                //onChangeText={text => SearchFilter(text)}
                //value={this.state.text}
                underlineColorAndroid="transparent"
                placeholder={t("searchHint")}
            />
            <SearchList data={services}/>
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
