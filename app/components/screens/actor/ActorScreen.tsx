import { useActor } from './useActor'
import { Layout, Loader, MovieCatalog, NotFound } from '../../ui'

const ActorScreen = () => {
	const { movies, actor, isLoading } = useActor()

	if (isLoading) return <Loader />
	return (
		<Layout isHasPadding>
			{actor ? (
				<MovieCatalog movies={movies} title={actor.name} isBackButton />
			) : (
				<NotFound />
			)}
		</Layout>
	)
}

export default ActorScreen
