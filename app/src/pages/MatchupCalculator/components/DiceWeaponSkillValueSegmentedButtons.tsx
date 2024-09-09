import React from "react";
import { SegmentedButtons } from "react-native-paper";

import DiceSkillValue from "@/app/src/utilities/DiceSkillValue";

export interface DiceWeaponSkillValueSegmentedButtonsProps {
    value: DiceSkillValue;
    setValue: (value: DiceSkillValue) => void;
}

function DiceWeaponSkillValueSegmentedButtons(props: DiceWeaponSkillValueSegmentedButtonsProps) {
    const {
        value,
        setValue,
    } = props;

    return (
        <SegmentedButtons
            value={value.value}
            onValueChange={(v) => setValue(DiceSkillValue.parse(v))}
            buttons={
                DiceSkillValue.AllValues.map((dsv) => ({ value: dsv.value, label: dsv.description }))
            }
        />
    );
}

export default DiceWeaponSkillValueSegmentedButtons;