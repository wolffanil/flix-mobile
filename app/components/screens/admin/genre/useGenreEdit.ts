import Toast from 'react-native-toast-message'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IGenreEditInput } from '../../../../shared/types/genre.interface'
import { useTypedRoute } from '../../../../hooks/useTypedRoute'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GenreService } from '../../../../services/genre.service'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { params } = useTypedRoute<'GenreEdit'>()

	const genreId = params.id

	const { isLoading } = useQuery(
		['get genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess(data) {
				Object.entries<string>(data).find(([key, value]) => {
					setValue(key as keyof IGenreEditInput, value)
				})
			},
			enabled: !!genreId
		}
	)

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation(
		['update genre'],
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			async onSuccess() {
				Toast.show({
					type: 'success',
					text1: 'Update genre',
					text2: 'update was successful'
				})

				await queryClient.invalidateQueries(['search genres'])
				await queryClient.invalidateQueries(['get genre', genreId])
			}
		}
	)

	const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
		await mutateAsync(data)
	}

	return {
		onSubmit,
		isLoading
	}
}
