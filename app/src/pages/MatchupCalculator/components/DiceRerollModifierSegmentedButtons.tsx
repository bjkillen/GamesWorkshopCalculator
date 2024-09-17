import React from "react";
import { SegmentedButtons } from "react-native-paper";

import DiceRerollModifierValue from "@/app/src/utilities/enums/DiceRerollModifierValue";

export interface DiceRerollModifierSegmentedButtonsProps {
    value: DiceRerollModifierValue;
    setValue: (value: DiceRerollModifierValue) => void;
}

function DiceRerollModifierSegmentedButtons(props: DiceRerollModifierSegmentedButtonsProps) {
    const {
        value,
        setValue,
    } = props;

    return (
        <SegmentedButtons
            value={value.value}
            onValueChange={(v) => setValue(DiceRerollModifierValue.parse(v))}
            buttons={
                DiceRerollModifierValue.AllValues.map((drmv) => ({ value: drmv.value, label: drmv.description }))
            }
        />
    );
}

export default DiceRerollModifierSegmentedButtons;