import { GestureResponderEvent } from 'react-native';
import { Checkbox, ToggleButton } from 'react-native-paper';

export interface ToggleButtonProps {
    label: string;
    value: boolean;
    setValue: (value: boolean) => void;
}

function CustomCheckbox(props: ToggleButtonProps) {
    const {
        label,
        value,
        setValue,
    } = props;

    return (
        <Checkbox.Item
            label={label}
            status={value ? 'checked' : 'unchecked'}
            onPress={() => {
                setValue(!value);
            }}
        />
    );
}

export default CustomCheckbox;