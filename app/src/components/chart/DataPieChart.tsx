import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

export interface DataPieChartProps {
    data: Map<string, number>,
    height: number
}

function DataPieChart(props: DataPieChartProps) {
    const { data, height } = props;
    const screenWidth =  Dimensions.get("window").width;

    const colors = ['#83a7ea', 'red', 'black', 'darkgray', '#00f'];

    const chartConfig = {
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
        }

    function convertData(input: Map<string, number>) {
        return Array.from(input).map((i, index) => {
            return {
                name: i[0],
                value: i[1],
                legendFontSize: 15,
                color: colors[index % colors.length]
            }
        })
    }

    return (
        <View>
            <PieChart
                data={convertData(data)}
                width={screenWidth}
                height={height}
                chartConfig={chartConfig}
                accessor={"value"}
                backgroundColor={"transparent"}
                paddingLeft={"5"}
                absolute
            />
        </View>
    );
}

export default DataPieChart;