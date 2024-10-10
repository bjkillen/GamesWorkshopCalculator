import MatchupCalculationMode from "@/app/src/utilities/enums/MatchupCalculationMode";
import React from "react";
import { SegmentedButtons } from "react-native-paper";

export interface DiceRerollModifierSegmentedButtonsProps {
    value: MatchupCalculationMode;
    setValue: (value: MatchupCalculationMode) => void;
}

function MatchupCalculationModeSegmentedButtons(props: DiceRerollModifierSegmentedButtonsProps) {
    const {
        value,
        setValue,
    } = props;

    return (
        <SegmentedButtons
            value={value.value}
            onValueChange={(v) => setValue(MatchupCalculationMode.parse(v))}
            buttons={
                MatchupCalculationMode.AllValues.map((mcm) => ({ value: mcm.value, label: mcm.value }))
            }
        />
    );
}

export default MatchupCalculationModeSegmentedButtons;