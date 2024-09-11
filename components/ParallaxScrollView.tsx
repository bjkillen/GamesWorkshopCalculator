
import type { PropsWithChildren } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 200;

type ParallaxScrollViewProps = PropsWithChildren<{
    backgroundImageSource: ImageSourcePropType
}>;

function ParallaxScrollView(props: ParallaxScrollViewProps) {
    const { children, backgroundImageSource } = props;

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);

    const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[-IMG_HEIGHT / 2, 0, 0]
					)
				},
				{
					scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
				}
			]
		};
	});

    return (
        <View style={styles.container}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
				<Animated.Image
					source={backgroundImageSource}
					style={[styles.image, imageAnimatedStyle]}
				/>
                <View style={styles.content}>
                    {children}
                </View>
            </Animated.ScrollView>
        </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		height: IMG_HEIGHT,
		overflow: 'hidden',
	},
    content: {
        flex: 1,
        gap: 16,
		overflow: 'hidden',
    }
});

export default ParallaxScrollView;