import { useEffect } from 'react'
import {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated'

export const useFavoriteAnimation = (isSmashed: boolean) => {
	const liked = useSharedValue(0)

	useEffect(() => {
		liked.value = withSpring(isSmashed ? 1 : 0)
	}, [isSmashed])

	const outlineStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolation.CLAMP)
			}
		]
	}))

	const fillStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: liked.value
			}
		],
		opacity: liked.value
	}))

	return { liked, outlineStyle, fillStyle }
}
