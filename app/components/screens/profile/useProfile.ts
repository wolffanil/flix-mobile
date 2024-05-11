import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IAuth } from '../../../shared/types/auth.interface'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UserService } from '../../../services/user.service'
import Toast from 'react-native-toast-message'

export const useProfile = (setValue: UseFormSetValue<IAuth>) => {
	const { isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile(),
		onSuccess: ({ email }) => {
			setValue('email', email)
		}
	})

	const { mutateAsync, isLoading: isUpdatingProfile } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IAuth) => UserService.updateProfile(data),

		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Update profile',
				text2: 'update was successful'
			})
		}
	})

	const onSubmit: SubmitHandler<IAuth> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading, isUpdatingProfile }
}
