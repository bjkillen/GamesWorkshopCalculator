import { StyleProp, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";

export interface MultineTextInputProps {
    label: string;
    disabled?: boolean;
    value?: string;
    setValue: (value: string | undefined) => void;
    style?: StyleProp<ViewStyle>;
}

interface MultineTextInputDefaultProps {
    disabled: boolean;
}

type NumericalTextInputDefaultPropsWithDefaults = MultineTextInputProps &
    MultineTextInputDefaultProps;

function MultineTextInput(props: MultineTextInputProps) {
    const {
        label,
        disabled,
        value,
        setValue,
        style
    } = props as NumericalTextInputDefaultPropsWithDefaults;

    return (
        <TextInput
            value={value}
            label={label}
            disabled={disabled}
            keyboardType='default'
            multiline
            style={style}
            onChangeText={text =>
                setValue(text)
            }
        />
    );
}

export default MultineTextInput;