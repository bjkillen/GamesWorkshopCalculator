import * as React from 'react';
import { TextInput } from 'react-native-paper';

import VariableNumericalValueParser, { VariableNumericalValue } from '../utilities/factionDatasheets/VariableNumericalValueParser';

export interface VariableNumericalTextInputProps {
    label: string;
    disabled?: boolean;
    value?: VariableNumericalValue;
    setValue: (value: VariableNumericalValue | undefined) => void;
}

interface VariableNumericalTextInputDefaultProps {
    disabled: boolean;
}

type NumericalTextInputDefaultPropsWithDefaults = VariableNumericalTextInputProps &
    VariableNumericalTextInputDefaultProps;

function VariableNumericalTextInput(props: VariableNumericalTextInputProps) {
    const {
        label,
        disabled,
        value,
        setValue,
    } = props as NumericalTextInputDefaultPropsWithDefaults;

    return (
        <TextInput
            value={value?.stringVal ?? ''}
            label={label}
            disabled={disabled}
            keyboardType='default'
            onChangeText={text =>
                setValue(VariableNumericalValueParser.Parse(text))
            }
        />
    );
}

export default VariableNumericalTextInput;