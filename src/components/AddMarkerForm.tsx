import React from 'react';
import {Text, useWindowDimensions, View,} from 'react-native';
import {Overlay, Input} from "react-native-elements";
import {useSelector} from "react-redux";
import {RootState} from "../store";
// @ts-ignore
import RadioButtonRN from "radio-buttons-react-native"

interface Props{
    visibility: boolean;
    onBackdropPress: () => void;
};

const AddMarkerForm: React.FC<Props> = ({visibility, onBackdropPress}) =>  {
    const location = useSelector((state: RootState) => state.location);
    const data = [
        {
            label: 'data 1'
        },
        {
            label: 'data 2'
        }
    ];
    return (
<View>
        <Overlay isVisible={visibility} onBackdropPress={onBackdropPress} overlayStyle={{elevation: 10, padding: 25, width: '80%', height: '80%'}}>
            <Input autoCapitalize={"sentences"} autoFocus={true} placeholder={'Description'}/>
            <RadioButtonRN data={data} selectedBtn={(e: any) => console.log(e)}/>
        </Overlay>

</View>
    );

};
export default AddMarkerForm
