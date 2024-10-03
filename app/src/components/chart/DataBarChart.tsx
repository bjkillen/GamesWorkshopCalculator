import { BarChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";

export interface DataBarChartProps {
    data: ChartData,
    width: number,
    height: number
}

export function convertNumberKeyData(input: Map<number, number>): ChartData {
    let labels: string[] = [];
    let data: number[] = [];

    Array.from(input).sort((a, b) =>
        {
            let aValAbs = Math.abs(a[0]);
            let bValAbs = Math.abs(b[0]);

            if (aValAbs > bValAbs) {
                return 1;
            } else if (aValAbs < bValAbs) {
                return -1;
            }

            return 0;
        }).forEach((i) => {
        labels.push(i[0].toString());
        data.push(i[1]);
    });

    return {
        labels,
        datasets: [
            {
                data
            }
        ]
    }
}

export function convertStringKeyData(input: Map<string, number>): ChartData {
    let labels: string[] = [];
    let data: number[] = [];

    Array.from(input).forEach((i) => {
        labels.push(i[0]);
        data.push(i[1]);
    });

    return {
        labels,
        datasets: [
            {
                data
            }
        ]
    }
}

function DataBarChart(props: DataBarChartProps) {
    const { data, width, height } = props;

    const chartConfig: AbstractChartConfig = {
        backgroundColor: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 8,
            marginVertical: 8,
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        },
    }

    return (
        <BarChart
            data={data}
            width={width}
            height={height}
            yAxisLabel=""
            yAxisSuffix=""
            xAxisLabel=""
            chartConfig={chartConfig}
            fromZero
        />
    )
}

export default DataBarChart;