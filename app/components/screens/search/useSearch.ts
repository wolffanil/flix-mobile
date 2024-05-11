import { useQuery } from '@tanstack/react-query'
import { useSearchForm } from './useSearchForm'
import { MovieService } from '../../../services/movie.service'

export const useSearch = () => {
	const { searchTerm, debouncedValue, control } = useSearchForm()

	const { data: movies, isLoading } = useQuery(
		['search movies', debouncedValue],
		() => MovieService.getAll(debouncedValue),
		{
			enabled: !!debouncedValue
		}
	)

	return { movies, isLoading, control, searchTerm }
}
