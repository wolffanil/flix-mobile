import { useMutation, useQuery } from '@tanstack/react-query'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import { useSearchForm } from '../../search/useSearchForm'
import { UserService } from '../../../../services/user.service'
import Toast from 'react-native-toast-message'
import { useMemo } from 'react'
import { ITableItem } from '../../../ui'

export const useUsers = () => {
	const { debouncedValue, control } = useSearchForm()

	const { navigate } = useTypedNavigation()

	const queryData = useQuery(
		['search users', debouncedValue],
		() => UserService.getAll(debouncedValue),
		{
			select: data =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editNavigate: () =>
							navigate('UserEdit', {
								id: user._id
							}),
						items: [
							user.email,
							new Date(user.createdAt).toLocaleDateString('ru')
						]
					})
				)
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		['delete user'],
		(userId: string) => UserService.deleteUser(userId),
		{
			onSuccess: async () => {
				Toast.show({
					type: 'success',
					text1: 'Delete user',
					text2: 'delete was successful'
				})

				await queryData.refetch()
			}
		}
	)

	return useMemo(
		() => ({ ...queryData, control, deleteAsync }),
		[queryData, deleteAsync]
	)
}
