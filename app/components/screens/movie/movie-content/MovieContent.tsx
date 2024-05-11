import { FC, useRef } from 'react'
import { View, Animated } from 'react-native'
import { IMovieComponent } from '../movie-page.interface'
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'
import { useScrollToTop } from '@react-navigation/native'
import MovieInfo from './MovieInfo'
import ActorCarousel from './ActorCarousel'
import RelatedMovies from './RelatedMovies'
import { HEADER_HEIGHT } from './movie.constants'
import VideoPlayer from '../VideoPlayer'

const MovieContent: FC<IMovieComponent> = ({ movie, y }) => {
	const ref = useRef<ScrollView>(null)
	useScrollToTop(ref)

	return (
		<Animated.ScrollView
			ref={ref}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			onScroll={Animated.event(
				[
					{
						nativeEvent: { contentOffset: { y } }
					}
				],

				{
					useNativeDriver: true
				}
			)}
			contentContainerStyle={{
				paddingTop: HEADER_HEIGHT / 1.3
			}}
		>
			<MovieInfo movie={movie} y={y} />
			<View className='bg-[#090909] px-6 pt-1 pb-24'>
				<VideoPlayer video={movie.videoUrl} />
				<ActorCarousel actors={movie.actors} />
				<RelatedMovies
					currentMovieId={movie._id}
					genreIds={movie.genres.map(({ _id }) => _id)}
				/>
			</View>
		</Animated.ScrollView>
	)
}

export default MovieContent
