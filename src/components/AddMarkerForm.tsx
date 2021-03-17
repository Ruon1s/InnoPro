import React, {useState} from 'react';
import {Animated, Text, TextInput, useWindowDimensions, View,} from 'react-native';
import {Overlay, Input, Button} from "react-native-elements";
import {useSelector} from "react-redux";
import {RootState} from "../store";
// @ts-ignore
import RadioButtonRN from "radio-buttons-react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik, Form} from 'formik';
import InputField from "./InputField";
import {MarkerValues} from "../types";
import {signIn} from "../store/user/actions";
import CustomButton from "./CustomButton";

interface Props{
    visibility: boolean;
    onBackdropPress: () => void;
};

const AddMarkerForm: React.FC<Props> = ({visibility, onBackdropPress}) =>  {

    const location = useSelector((state: RootState) => state.location);
    const [color, setColor] = useState('green');
    const [selected, setSelected] = useState({label: 'green marker', color: 'green'});

    const initialValues: MarkerValues = {
        description: "",
    };
    interface selectedValue  {
        picked: {
            label: string;
            color: string;
        }
    }

    const data = [
        {
            label: 'green marker',
            color: 'green'
        },
        {
            label: 'yellow marker',
            color: 'yellow'
        },
        {
            label: 'red marker',
            color: 'red'
        },

    ];
    const handleSubmit = async (values: MarkerValues) => {
        console.log('handlesubmit values: ' +  values.description + 'selected radiobutton value: ' + selected.label);
        //do all the stuff here with form data,
        //values.x is from textfield(s)
        //selected.x is from the radiogroup
        onBackdropPress()
    };


    return (
<View>
        <Overlay isVisible={visibility} onBackdropPress={onBackdropPress} overlayStyle={{elevation: 10, padding: 25, width: '80%', height: '80%'}}>
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
                <InputField name='description' placeholder='Description' />
                <CustomButton title="Add marker" onPress={handleSubmit} />
                </View>
                    )}
            </Formik>



        </Overlay>

</View>
    );

};
export default AddMarkerForm
