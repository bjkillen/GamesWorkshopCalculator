import DiceSkillValues from "@/app/src/components/DiceSkillValues";
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
            buttons={
                Object.keys(DiceSkillValues).map((dsv) => ({ value: dsv, label: dsv }))
            }
        />
    );
}

export default DiceWeaponSkillValueSegmentedButtons;