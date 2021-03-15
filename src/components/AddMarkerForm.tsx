import React from 'react';
import {Text, useWindowDimensions, View,} from 'react-native';
import {Overlay, Input} from "react-native-elements";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface Props{
    visibility: boolean;
    onBackdropPress: () => void;
};

const AddMarkerForm: React.FC<Props> = ({visibility, onBackdropPress}) =>  {
    const location = useSelector((state: RootState) => state.location);
    return (
<View>
        <Overlay isVisible={visibility} onBackdropPress={onBackdropPress} overlayStyle={{elevation: 10, padding: 25, width: '80%', height: '80%'}}>
            <Input autoCapitalize={"sentences"} autoFocus={true} placeholder={'Description'}/>

        </Overlay>

</View>
    );

};
export default AddMarkerForm
