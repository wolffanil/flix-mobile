import { View, Text, ListRenderItemInfo } from 'react-native'
import { useRelatedMovies } from './useRelatedMovies'
import { FC } from 'react'
import { Loader, MovieItem } from '../../../ui'
import HorizontalList from '../../../ui/HorizontalList'
import { IMovie } from '../../../../shared/types/movie.interface'

interface IRelatedMovies {
	currentMovieId: string
	genreIds: string[]
}

const RelatedMovies: FC<IRelatedMovies> = ({ currentMovieId, genreIds }) => {
	const { isLoading, data } = useRelatedMovies(genreIds, currentMovieId)

	if (isLoading) return <Loader />
	if (!data?.length) return null

	return (
		<View className='my-8'>
			<Text className='text-white text-2xl font-semibold mb-5'>
				Related movies
			</Text>
			<HorizontalList
				snapToInterval={160}
				data={data}
				//@ts-ignore
				renderItem={({ item: movie, index }: ListRenderItemInfo<IMovie>) => (
					<MovieItem
						index={index}
						movie={movie}
						key={movie._id}
						className='mr-4 w-36'
					/>
				)}
			/>
		</View>
	)
}

export default RelatedMovies
