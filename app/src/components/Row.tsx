import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface RowProps {
    children: any;
    style?: StyleProp<ViewStyle>;
}

function Row(props: RowProps)  {
    const { children, style } = props;

    return (
        <View style={StyleSheet.compose(styles.container, style)}>{children}</View>
    );
};

// create styles of Row
const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
});

export default Row;