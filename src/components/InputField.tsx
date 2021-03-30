import React from 'react';
import {KeyboardTypeOptions, StyleSheet, Text, TextInput, View} from 'react-native';
import {useField} from 'formik';

const styles = StyleSheet.create({
    inputField: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 5,
        margin: 10,
    },
    errorText: {
        color: '#d73a4a',
        marginLeft: 10,
    },
    errorBorder: {
        borderColor: '#d73a4a',
    },
    fullWidth: {
        flex: 1,
        flexDirection: 'column'
    }
});

interface Props {
    name: string;
    secure?: boolean;
    placeholder: string;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    keyboardType?: KeyboardTypeOptions;
    fullWidth?: boolean
}

const InputField: React.FC<Props> = ({name, secure, placeholder, autoCapitalize = "none", keyboardType, fullWidth}) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error !== undefined;

    const inputFieldStyles = [
        styles.inputField,
        showError && styles.errorBorder,
    ]

    const containerStyles = [
        fullWidth && styles.fullWidth
    ]

    return (
        <View style={containerStyles}>
            <TextInput
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                value={field.value}
                onChangeText={value => helpers.setValue(value)}
                placeholder={placeholder}
                onBlur={() => helpers.setTouched(true)}
                style={inputFieldStyles}
                secureTextEntry={secure}
            />
            {showError && <Text style={styles.errorText}> {meta.error} </Text>}
        </View>
    );
}

export default InputField;
