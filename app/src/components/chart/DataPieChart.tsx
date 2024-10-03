import { View } from "react-native";
import { Pie, PolarChart } from "victory-native";
import NumberExtension from "../../utilities/extensions/NumberExtension";

export interface DataPieChartProps {
    data: Map<string, number>
}

function DataPieChart(props: DataPieChartProps) {
    const { data } = props;
    const colors = ['#83a7ea', 'red', 'black', 'darkgray', '#00f'];

    function convertData(input: Map<string, number>) {
        return Array.from(input).map((i, index) => {
            return {
                name: i[0],
                value: NumberExtension.roundedToNearest(i[1], 5),
                color: colors[index % colors.length],
                label: i[0]
            }
        })
    }

    return (
        <>
            {data.size > 0 &&
                <PolarChart
                    data={convertData(data)}
                    labelKey={"label"}
                    valueKey={"value"}
                    colorKey={"color"}
                >
                    <Pie.Chart />
                </PolarChart>
            }
        </>
    );
}

export default DataPieChart;