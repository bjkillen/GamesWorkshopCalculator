import { LinearGradient, matchFont, vec } from "@shopify/react-native-skia";
import { View } from "react-native";
import { Bar, CartesianChart } from "victory-native";
import { DefaultTheme } from "react-native-paper";

export interface DataBarChartProps {
    data: any[],
    width: number,
    height: number
}

export function convertNumberKeyData(input: Map<number, number>): Record<string, unknown>[] {
    return Array.from(input).sort((a, b) =>
        {
            let aValAbs = Math.abs(a[0]);
            let bValAbs = Math.abs(b[0]);

            if (aValAbs > bValAbs) {
                return 1;
            } else if (aValAbs < bValAbs) {
                return -1;
            }

            return 0;
        })
        .map((i) => {
            return {
                label: i[0].toString(),
                value: i[1]
            }
        });
}

export function convertStringKeyData(input: Map<string, number>): Record<string, unknown>[] {
    return Array.from(input).map((i) => {
        return {
            label: i[0],
            value: i[1]
        }
    });
}

function DataBarChart(props: DataBarChartProps) {
    const { data, width, height } = props;

    const labelFontFromTheme = DefaultTheme.fonts.labelMedium;
    const font = matchFont(labelFontFromTheme);

    return (
        <View style={{ height, width }}>
            <CartesianChart
                data={data}
                xKey="label"
                yKeys={["value"]}
                domainPadding={{ left: 50, right: 50, top: 30 }}
                xAxis={{
                    font
                }}
            >
                {({ points, chartBounds }) => (
                    <Bar
                        points={points.value}
                        chartBounds={chartBounds}
                    >
                        <LinearGradient
                            start={vec(0, 0)}
                            end={vec(0, 400)}
                            colors={[
                                "#a78bfa",
                                "#a78bfa30"
                            ]}
                        />
                    </Bar>
                )}
            </CartesianChart>
        </View>
    )
}

export default DataBarChart;