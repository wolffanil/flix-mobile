import { useQuery } from '@tanstack/react-query'
import { useTypedRoute } from '../../../hooks/useTypedRoute'
import { GenreService } from '../../../services/genre.service'
import { MovieService } from '../../../services/movie.service'

export const useGenre = () => {
	const { params } = useTypedRoute<'Genre'>()

	const { isLoading, data: genre } = useQuery(
		['get genre by slug', params.slug],
		() => GenreService.getBySlug(params.slug)
	)

	const genreId = genre?._id || ''

	const { isLoading: isMoviesLoading, data: movies } = useQuery(
		['get movies by genre', genreId],
		() => MovieService.getByGeneres([genreId]),
		{
			enabled: !!genreId
		}
	)

	return { isLoading: isLoading || isMoviesLoading, movies, genre }
}
