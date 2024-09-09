import * as React from 'react';
import { TextInput } from 'react-native-paper';

import NumberExtension from '../utilities/extensions/NumberExtension';

export interface NumericalTextInputProps {
    label: string;
    value?: number;
    setValue: (value: number | undefined) => void;
}

function NumericalTextInput(props: NumericalTextInputProps) {
    const {
        label,
        value,
        setValue,
    } = props;

    return (
        <TextInput
            value={value?.toString() ?? ''}
            label={label}
            keyboardType='numeric'
            onChangeText={text =>
                setValue(NumberExtension.parseTextFlooredZeroOrUndefined(text))
            }
        />
    );
}

export default NumericalTextInput;