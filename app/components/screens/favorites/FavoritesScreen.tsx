import { View, Text } from 'react-native'
import { useFavorites } from './useFavorites'
import { Layout, Loader, MovieCatalog } from '../../ui'

const FavoritesScreen = () => {
	const { isLoading, favoriteMovies } = useFavorites()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<MovieCatalog title='Favorites' movies={favoriteMovies} />
		</Layout>
	)
}

export default FavoritesScreen
