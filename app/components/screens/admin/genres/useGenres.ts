import { useMutation, useQuery } from '@tanstack/react-query'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import { useSearchForm } from '../../search/useSearchForm'
import { ITableItem } from '../../../ui'
import { GenreService } from '../../../../services/genre.service'
import Toast from 'react-native-toast-message'
import { useMemo } from 'react'

export const useGenres = () => {
	const { debouncedValue, control } = useSearchForm()
	const { navigate } = useTypedNavigation()

	const queryData = useQuery(
		['search genres', debouncedValue],
		() => GenreService.getAll(debouncedValue),
		{
			select: data =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editNavigate: () =>
							navigate('GenreEdit', {
								id: genre._id
							}),

						items: [genre.name, genre.slug]
					})
				)
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		['create genre'],
		() => GenreService.create(),
		{
			onSuccess: async _id => {
				Toast.show({
					type: 'success',
					text1: 'Create genre',
					text2: 'create was successful'
				})

				navigate('GenreEdit', {
					id: _id
				})
			}
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		['delete genre'],
		(genreId: string) => GenreService.delete(genreId),
		{
			onSuccess: async () => {
				Toast.show({
					type: 'success',
					text1: 'Delete genre',
					text2: 'delete was successful'
				})

				await queryData.refetch()
			}
		}
	)

	return useMemo(
		() => ({
			...queryData,
			createAsync,
			deleteAsync,
			control
		}),
		[queryData, createAsync, deleteAsync]
	)
}
