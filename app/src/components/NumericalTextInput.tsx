import * as React from 'react';
import { TextInput } from 'react-native-paper';

import NumberExtension from '../utilities/extensions/NumberExtension';

export interface NumericalTextInputProps {
    label: string;
    disabled?: boolean;
    value?: number;
    setValue: (value: number | undefined) => void;
}

interface NumericalTextInputDefaultProps {
    disabled: boolean;
}

type NumericalTextInputDefaultPropsWithDefaults = NumericalTextInputProps &
    NumericalTextInputDefaultProps;

function NumericalTextInput(props: NumericalTextInputProps) {
    const {
        label,
        disabled,
        value,
        setValue,
    } = props as NumericalTextInputDefaultPropsWithDefaults;

    return (
        <TextInput
            value={value?.toString()}
            label={label}
            disabled={disabled}
            keyboardType='numeric'
            onChangeText={text =>
                setValue(NumberExtension.parseTextFlooredZeroOrUndefined(text))
            }
        />
    );
}

export default NumericalTextInput;