import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchForm } from '../../search/useSearchForm'
import { MovieService } from '../../../../services/movie.service'
import { ITableItem } from '../../../ui'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import Toast from 'react-native-toast-message'
import { useMemo } from 'react'

export const useMovies = () => {
	const { debouncedValue, control } = useSearchForm()
	const { navigate } = useTypedNavigation()

	const queryData = useQuery(
		['search movies', debouncedValue],
		() => MovieService.getAll(debouncedValue),
		{
			select: data =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editNavigate: () =>
							navigate('MovieEdit', {
								id: movie._id
							}),

						items: [
							movie.title,
							`${movie.genres[0].name} ${movie.genres.length > 1 ? '...' : ''}`,
							String(movie.rating)
						]
					})
				)
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		['craete movie'],
		() => MovieService.create(),
		{
			onSuccess: async _id => {
				Toast.show({
					type: 'success',
					text1: 'Create movie',
					text2: 'create was successful'
				})

				navigate('MovieEdit', {
					id: _id
				})
			}
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		['delete movie'],
		(movieId: string) => MovieService.delete(movieId),
		{
			onSuccess: async () => {
				Toast.show({
					type: 'success',
					text1: 'Delete movie',
					text2: 'delete was successful'
				})

				await queryData.refetch()
			}
		}
	)

	return useMemo(
		() => ({
			...queryData,
			control,
			deleteAsync,
			createAsync
		}),
		[queryData, deleteAsync, createAsync]
	)
}
