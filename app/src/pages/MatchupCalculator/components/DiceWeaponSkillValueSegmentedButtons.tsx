import React from "react";
import { SegmentedButtons } from "react-native-paper";

import { DiceSkillValue } from "gamesworkshopcalculator.common";

export interface DiceWeaponSkillValueSegmentedButtonsProps {
    disabled?: boolean;
    value: DiceSkillValue;
    setValue: (value: DiceSkillValue) => void;
}

interface DiceWeaponSkillValueSegmentedButtonsDefaultProps {
    disabled: boolean;
}

type DiceWeaponSkillValueSegmentedButtonsPropsWithDefaults = DiceWeaponSkillValueSegmentedButtonsProps &
    DiceWeaponSkillValueSegmentedButtonsDefaultProps;

function DiceWeaponSkillValueSegmentedButtons(props: DiceWeaponSkillValueSegmentedButtonsProps) {
    const {
        disabled,
        value,
        setValue,
    } = props as DiceWeaponSkillValueSegmentedButtonsPropsWithDefaults;

    return (
        <SegmentedButtons
            value={value.value}
            onValueChange={(v) => setValue(DiceSkillValue.parse(v))}
            buttons={
                DiceSkillValue.AllValues.map((dsv) => ({
                    value: dsv.value,
                    label: dsv.description,
                    disabled: disabled
                }))
            }
        />
    );
}

export default DiceWeaponSkillValueSegmentedButtons;