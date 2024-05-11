import { View, Text } from 'react-native'
import { Layout, Loader, MovieCatalog } from '../../ui'
import { useTrending } from './useTrending'

const TrendingScreen = () => {
	const { isLoading, movies } = useTrending()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<MovieCatalog
				title='Trending'
				movies={movies}
				description='Trending movies in excellent quality: legal, safe, without, ads'
			/>
		</Layout>
	)
}

export default TrendingScreen
