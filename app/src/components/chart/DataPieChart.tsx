import { View } from "react-native";
import { Pie, PolarChart } from "victory-native";
import NumberExtension from "../../utilities/extensions/NumberExtension";
import { Canvas, Rect } from "@shopify/react-native-skia";
import { Text } from "react-native-paper";
import Row from "../Row";
import ColorExtension from "../../utilities/extensions/ColorExtension";
import WargearClassification from "../../utilities/enums/WargearClassification";

export interface DataPieChartProps {
    data: any[]
}

const startingPieColorHex = '#0F52BA';
const endingPieColorHex = '#ADD8E6';

export function convertData(input: Map<string, number>) {
    return Array.from(input).map((i, index) => {
        return {
            name: i[0],
            value: NumberExtension.roundedToNearest(i[1], 5),
            color: ColorExtension.lerpColor(startingPieColorHex, endingPieColorHex, index / input.size),
            label: i[0]
        }
    })
}

export function convertWargearClassificationData(input: Map<string, number>) {
    return Array.from(input).map((i, index) => {
        const parsedWargearClass = WargearClassification.parse(i[0]);

        return {
            name: parsedWargearClass?.recommendationText ?? i[0],
            value: NumberExtension.roundedToNearest(i[1], 5),
            color: parsedWargearClass?.color,
            label: parsedWargearClass?.recommendationText ?? i[0]
        }
    })
}

function DataPieChart(props: DataPieChartProps) {
    const { data } = props;

    return (
        <>
            {data.length > 0 &&
                <>
                    <PolarChart
                        data={data}
                        labelKey={"label"}
                        valueKey={"value"}
                        colorKey={"color"}
                    >
                        <Pie.Chart innerRadius={"50%"} />
                    </PolarChart>
                    <Row style={{ flexWrap: "wrap", alignSelf: "center", marginTop: 10 }}>
                        {data.map((d, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        marginRight: 8,
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                <Canvas style={{ height: 12, width: 12, marginRight: 4 }}>
                                    <Rect
                                    rect={{ x: 0, y: 0, width: 12, height: 12 }}
                                    color={d.color}
                                    />
                                </Canvas>
                                <Text>{d.label}</Text>
                                </View>
                            );
                        })}
                    </Row>
                </>
            }
        </>
    );
}

export default DataPieChart;