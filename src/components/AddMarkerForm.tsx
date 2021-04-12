import React, {useState} from 'react';
import {Animated, Text, TextInput, useWindowDimensions, View,} from 'react-native';
import {Overlay, Input, Button} from "react-native-elements";
import {useDispatch, useSelector} from "react-redux";
import {newMarker} from "../store/markers/actions";
import {RootState} from "../store";
// @ts-ignore
import RadioButtonRN from "radio-buttons-react-native"
import {FontAwesome5} from '@expo/vector-icons';
import {Formik, Form} from 'formik';
import InputField from "./InputField";
import {MarkerValues} from "../types";
import {signIn} from "../store/user/actions";
import CustomButton from "./CustomButton";
import {useTranslation} from "react-i18next";

interface Props {
    visibility: boolean;
    onBackdropPress: () => void;
};
/**
 * Form in an overlay for adding map markers
 * @param visibility for viewin the overlay
 * @param onBackdropPress alters the visibility boolean so that your back button closes the overlay instead of navigating to previous view.
 */

const AddMarkerForm: React.FC<Props> = ({visibility, onBackdropPress}) => {
    //get location from redux state
    const location = useSelector((state: RootState) => state.location);
    //state for setting color of the form depending on selected radio button
    const [color, setColor] = useState('green');
    //selected state for information about the selected radiobutton
    const [selected, setSelected] = useState({label: 'green marker', color: 'green'});
    //Dispatch for redux
    const dispatch = useDispatch();

    const {t, i18n} = useTranslation();


    const initialValues: MarkerValues = {
        description: "",
    };

    //radio button values
    const data = [
        {
            label: t("greenMarker"),
            color: 'green'
        },
        {
            label: t("yellowMarker"),
            color: 'yellow'
        },
        {
            label: t("redMarker"),
            color: 'red'
        },
    ];

    /**
     * submit button function, sets all values into an object and sends it to firebase
     * @see newMarker
     * @param values
     */
    const handleSubmit = async (values: MarkerValues) => {
        console.log('handlesubmit values: ' + values.description + 'selected radiobutton value: ' + selected.label);
        let date = new Date();
        const stringDate = date.toLocaleDateString();
        const markerValues = {
            description: values.description,
            lon: location.coords.longitude,
            lat: location.coords.latitude,
            color: selected.color,
            timestamp: stringDate,
        };
        dispatch(newMarker(markerValues));
        onBackdropPress()
    };


    return (
        <View>
            <Overlay isVisible={visibility} onBackdropPress={onBackdropPress}
                     overlayStyle={{elevation: 10, padding: 25, width: '80%', height: '80%'}}>
                <RadioButtonRN
                    name='picked'
                    data={data}
                    activeColor={color}
                    icon={<FontAwesome5 name="map-marker-alt" size={24} color={color}/>}

                    selectedBtn={
                        (e: any) => {
                            setColor(e.color);
                            setSelected(e);
                            console.log(e)
                        }}
                />
                <Formik initialValues={initialValues} onSubmit={values => handleSubmit(values)}>
                    {({handleSubmit}) => (
                        <View>
                            <InputField name='description' placeholder={t("description")}/>
                            <CustomButton title={t("addMarker")} onPress={handleSubmit}/>
                        </View>
                    )}
                </Formik>


            </Overlay>

        </View>
    );

};
export default AddMarkerForm
