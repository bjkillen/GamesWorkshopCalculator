
import type { PropsWithChildren } from 'react';
import { Stack } from 'expo-router';
import { Dimensions, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
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

const IMG_HEIGHT = 300;

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
        <View style={styles.content}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.View
                    style={[
                        styles.header,
                        headerAnimatedStyle,
                    ]}>
                        <Animated.Image
                            source={backgroundImageSource}
                            style={[styles.image, imageAnimatedStyle]}
                        />
                </Animated.View>
                <View>
                    {children}
                </View>
            </Animated.ScrollView>
        </View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: width,
		height: IMG_HEIGHT
	},
    header: {
		backgroundColor: '#fff',
		height: 100,
		borderWidth: StyleSheet.hairlineWidth
	},
    content: {
        flex: 1,
        gap: 16,
        overflow: 'hidden',
    },
});

export default ParallaxScrollView;