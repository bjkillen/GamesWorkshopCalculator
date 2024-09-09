import { Checkbox } from 'react-native-paper';

export interface ToggleButtonProps {
    value: boolean;
    setValue: (value: boolean) => void;
}

function CustomCheckbox(props: ToggleButtonProps) {
    const {
        value,
        setValue,
    } = props;

    return (
        <Checkbox.Android
            status={value ? 'checked' : 'unchecked'}
            onPress={() => {
                setValue(!value);
            }}
        />
    );
}

export default CustomCheckbox;