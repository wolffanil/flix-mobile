import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetAllMovies } from './useGetAllMovies'
import { Layout, Loader } from '../../ui'
import Carousel from './carousel/Carousel'

function HomeScreen() {
	const { movies, isLoading } = useGetAllMovies()

	return (
		<Layout>
			{isLoading ? <Loader /> : movies?.length && <Carousel movies={movies} />}
		</Layout>
	)
}

export default HomeScreen
