import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { View, Text, Pressable } from 'react-native'
import { IAuth } from '../../../shared/types/auth.interface'
import { Button, DismissKeyboard, Loader } from '../../ui'
import AuthFields from './AuthFields'
import { useAuthMutations } from './useAuthMutations'

function AuthScreen() {
	const [isReg, setIsReg] = useState<boolean>(false)

	const { handleSubmit, control, reset } = useForm<IAuth>({
		mode: 'onChange'
	})

	const { loginSync, registerSync, isLoading } = useAuthMutations(reset)

	const onSubmit: SubmitHandler<IAuth> = data => {
		if (isReg) registerSync(data)
		else loginSync(data)
	}

	return (
		<DismissKeyboard>
			<View className='mx-2 items-center justify-center h-full'>
				<View className='w-9/12'>
					<Text className='text-center text-white text-4xl font-bold mb-2.5'>
						{isReg ? 'Register' : 'Login'}
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} isPassRequired />

							<Button icon={'film'} onPress={handleSubmit(onSubmit)}>
								Go to watch
							</Button>

							<Pressable onPress={() => setIsReg(!isReg)}>
								<Text className='text-white opacity-30 text-right text-base mt-3'>
									{isReg ? 'Login' : 'Register'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</DismissKeyboard>
	)
}

export default AuthScreen
