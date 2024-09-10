import { Checkbox, Text } from 'react-native-paper';
import Row from './Row';

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
        <Row style={{justifyContent: "space-between" , alignItems: 'center'}}>
            <Text>{label}</Text>
            <Checkbox.Android
                status={value ? 'checked' : 'unchecked'}
                onPress={() => {
                    setValue(!value);
                }}
            />
        </Row>
    );
}

export default CustomCheckbox;