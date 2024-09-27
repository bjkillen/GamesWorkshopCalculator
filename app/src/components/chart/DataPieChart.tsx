import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export interface DataPieChartProps {
    data: any[]
}

function DataPieChart(props: DataPieChartProps) {
    const { data } = props;
    const screenWidth =  Dimensions.get("window").width;

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

    return (
        <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 50]}
            absolute
        />
    );
}

export default DataPieChart;