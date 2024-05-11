import { View, Text } from 'react-native'
import { useTrending } from '../../../trending/useTrending'
import { STYLE_BLOCK } from './statistics.styles'
import { Loader, MovieItem } from '../../../../ui'

const PopularMoives = () => {
	const { isLoading, movies } = useTrending(2)

	return (
		<View className={`${STYLE_BLOCK} mt-6 p-2`}>
			<Text className='text-2xl font-bold text-white text-center mb-2'>
				The most popular movies
			</Text>
			<View className='flex-row justify-between mt-2'>
				{isLoading ? (
					<Loader />
				) : movies?.length ? (
					movies.map((movie, index) => (
						<View key={movie._id} style={{ width: '49%' }}>
							<MovieItem index={index} movie={movie} />
							<Text className='text-white text-center mt-2 text-base'>
								Opened {movie.countOpened} times
							</Text>
						</View>
					))
				) : (
					<Text className='text-white text-lg'>Elements not found</Text>
				)}
			</View>
		</View>
	)
}

export default PopularMoives
