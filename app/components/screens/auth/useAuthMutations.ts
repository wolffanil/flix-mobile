import { UseFormReset } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { IAuth } from '../../../shared/types/auth.interface'
import { AuthService } from '../../../services/auth/auth.service'
import { useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'

export const useAuthMutations = (reset: UseFormReset<IAuth>) => {
	const { setUser } = useAuth()

	const { mutate: loginSync, isLoading: isLoginLoging } = useMutation({
		mutationKey: ['login'],
		mutationFn: ({ email, password }: IAuth) =>
			AuthService.main('login', email, password),
		onSuccess: data => {
			setTimeout(() => {
				reset()
				setUser(data.user)
			})
		}
	})

	const { mutate: registerSync, isLoading: isRegisterLoading } = useMutation({
		mutationKey: ['reg'],
		mutationFn: ({ email, password }: IAuth) =>
			AuthService.main('req', email, password),
		onSuccess: data => {
			setTimeout(() => {
				reset()
				setUser(data.user)
			})
		}
	})

	return useMemo(
		() => ({
			loginSync,
			registerSync,
			isLoading: isLoginLoging || isRegisterLoading
		}),
		[isLoginLoging, isRegisterLoading]
	)
}
