import Toast from 'react-native-toast-message'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IActorEditInput } from '../../../../shared/types/actor.interface'
import { useTypedRoute } from '../../../../hooks/useTypedRoute'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ActorService } from '../../../../services/actor.service'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { params } = useTypedRoute<'ActorEdit'>()

	const actorId = params.id

	const { isLoading } = useQuery(
		['get actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess(data) {
				Object.entries<any>(data).find(([key, value]) => {
					setValue(key as keyof IActorEditInput, value)
				})
			},
			enabled: !!actorId
		}
	)

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation(
		['update actor'],
		(data: IActorEditInput) => ActorService.update(actorId, data),
		{
			async onSuccess() {
				Toast.show({
					type: 'success',
					text1: 'Update actor',
					text2: 'update was successful'
				})

				await queryClient.invalidateQueries(['search actors'])
				await queryClient.invalidateQueries(['get actor', actorId])
			}
		}
	)

	const onSubmit: SubmitHandler<IActorEditInput> = async data => {
		await mutateAsync(data)
	}

	return {
		onSubmit,
		isLoading
	}
}
