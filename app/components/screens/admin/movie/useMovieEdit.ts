import Toast from 'react-native-toast-message'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IMovieEditInput } from '../../../../shared/types/movie.interface'
import { useTypedRoute } from '../../../../hooks/useTypedRoute'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MovieService } from '../../../../services/movie.service'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { params } = useTypedRoute<'MovieEdit'>()

	const movieId = params.id

	const { isLoading } = useQuery(
		['get movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess(data) {
				Object.entries<any>(data).find(([key, value]) => {
					setValue(key as keyof IMovieEditInput, value)
				})
			},
			enabled: !!movieId
		}
	)

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation(
		['update movie'],
		(data: IMovieEditInput) => MovieService.update(movieId, data),
		{
			async onSuccess() {
				Toast.show({
					type: 'success',
					text1: 'Update movie',
					text2: 'update was successful'
				})

				await queryClient.invalidateQueries(['search movies'])
				await queryClient.invalidateQueries(['get movie', movieId])
			}
		}
	)

	const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
		await mutateAsync(data)
	}

	return {
		onSubmit,
		isLoading
	}
}
