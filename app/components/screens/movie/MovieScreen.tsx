import { useMovie } from './useMovie'
import { Layout, Loader } from '../../ui'
import MovieHeader from './MovieHeader'
import MovieBackground from './MovieBackground'
import MovieContent from './movie-content/MovieContent'
import { useRef } from 'react'
import { Animated } from 'react-native'
import { useUpdateCountOpened } from './useUpdateCountOpenes'

const MovieScreen = () => {
	const y = useRef(new Animated.Value(0)).current

	const { isLoading, movie } = useMovie()
	useUpdateCountOpened()

	if (isLoading) return <Loader />
	if (!movie) return null
	return (
		<Layout style={{ paddingTop: 0 }}>
			<MovieHeader movie={movie} y={y} />
			<MovieBackground movie={movie} y={y} />
			<MovieContent movie={movie} y={y} />
		</Layout>
	)
}

export default MovieScreen
