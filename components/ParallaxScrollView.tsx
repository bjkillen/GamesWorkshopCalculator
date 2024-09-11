
import type { PropsWithChildren } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type ParallaxScrollViewProps = PropsWithChildren<{
    backgroundImageSource: ImageSourcePropType
}>;

const IMG_HEIGHT = 200;

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
						[-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
					)
				},
				{
					scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
				}
			]
		};
	});

    const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1])
		};
	});

    return (
        <View style={styles.container}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
				<Animated.View style={[styles.parallaxImageView, imageAnimatedStyle]}>
					<Image
						source={backgroundImageSource}
						style={styles.image}
					/>
				</Animated.View>
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
		width: width,
		height: IMG_HEIGHT
	},
    parallaxImageView: {
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