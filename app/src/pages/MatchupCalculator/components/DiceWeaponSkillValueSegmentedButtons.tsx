import React from "react";
import { SegmentedButtons } from "react-native-paper";

export interface DiceWeaponSkillValueSegmentedButtonsProps {
    value: string;
    setValue: (value: string) => void;
}

function DiceWeaponSkillValueSegmentedButtons(props: DiceWeaponSkillValueSegmentedButtonsProps) {
    const {
        value,
        setValue,
    } = props;

    return (
        <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
                {
                    value: '2+',
                    label: '2+',
                },
                {
                    value: '3+',
                    label: '3+',
                },
                {
                    value: '4+',
                    label: '4+',
                },
                {
                    value: '5+',
                    label: '5+',
                },
                {
                    value: '6+',
                    label: '6+',
                },
            ]}
        />
    );
}

export default DiceWeaponSkillValueSegmentedButtons;