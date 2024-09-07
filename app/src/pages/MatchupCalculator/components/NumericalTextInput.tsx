import * as React from 'react';
import { TextInput } from 'react-native-paper';

export interface NumericalTextInputProps {
    label: string;
    value: number;
    setValue: (value: number) => void;
}

const NumericalTextInput = (props: NumericalTextInputProps) => {
    const {
        label,
        value,
        setValue,
    } = props;

    return (
        <TextInput
            label={label}
            value={value.toString()}
            keyboardType='numeric'
            onChangeText={text => setValue(Number(text))}
        />
    );
};

export default NumericalTextInput;