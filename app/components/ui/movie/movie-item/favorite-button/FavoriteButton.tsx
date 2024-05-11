import { FC } from 'react'
import { View } from 'react-native'
import BlurButton from '../../../blur-button/BlurButton'
import cn from 'clsx'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFavoriteAnimation } from './useFavoriteAnimation'
import Animated, { withSpring } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import { useFavorite } from './useFavorite'

interface IFavorityButton {
	movieId: string
	isSmall?: boolean
}

const FavoriteButton: FC<IFavorityButton> = ({ movieId, isSmall }) => {
	const { toggleFavorites, isSmashed } = useFavorite(movieId)
	const { outlineStyle, fillStyle, liked } = useFavoriteAnimation(isSmashed)

	return (
		<BlurButton
			isSmall={isSmall}
			className={cn({
				'w-8 h-8 rounded-lg': isSmall
			})}
			onPress={() => {
				liked.value = withSpring(liked.value === 1 ? 0 : 1)
				toggleFavorites()
			}}
		>
			<Animated.View
				className='items-center justify-center'
				style={[StyleSheet.absoluteFill, outlineStyle]}
			>
				<MaterialCommunityIcons
					name={'heart-outline'}
					size={isSmall ? 19 : 22}
					color={'white'}
				/>
			</Animated.View>

			<Animated.View className='items-center justify-center' style={fillStyle}>
				<MaterialCommunityIcons
					name={'heart'}
					size={isSmall ? 19 : 22}
					color={'#DC3F41'}
				/>
			</Animated.View>
		</BlurButton>
	)
}

export default FavoriteButton
