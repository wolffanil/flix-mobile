import { useGenre } from './useGenre'
import { Layout, Loader, MovieCatalog, NotFound } from '../../ui'

const GenreScreen = () => {
	const { isLoading, movies, genre } = useGenre()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			{genre ? (
				<MovieCatalog
					movies={movies}
					title={genre.name}
					description={genre.description}
					isBackButton
				/>
			) : (
				<NotFound />
			)}
		</Layout>
	)
}

export default GenreScreen
