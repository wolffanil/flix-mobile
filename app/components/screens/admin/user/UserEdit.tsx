import { Control, Controller, useForm } from 'react-hook-form'
import { Pressable, View } from 'react-native'
import { IUserEditInput } from '../../../../shared/types/user.interface'
import { useUserEdit } from './useUserEdit'
import { AdminNavigation, Button, Layout, Loader } from '../../../ui'
import AuthFields from '../../auth/AuthFields'
import { IAuth } from '../../../../shared/types/auth.interface'
import { Text } from 'react-native'
import Checkbox from 'expo-checkbox'
import { getColor } from '../../../../config/colors.config'

const UserEdit = () => {
	const { control, setValue, handleSubmit } = useForm<IUserEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Edit user' isBackButton />
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<AuthFields control={control as unknown as Control<IAuth>} />

						<Controller
							control={control}
							name='isAdmin'
							render={({ field: { onChange, value } }) => (
								<Pressable
									onPress={() => onChange(!value)}
									className='my-5 w-40 flex-row items-center'
								>
									<Checkbox
										value={value}
										onValueChange={onChange}
										color={value ? getColor('primary') : undefined}
									/>
									<Text className=' text-white text-base ml-2.5'>
										Admin rights
									</Text>
								</Pressable>
							)}
						/>

						<Button onPress={handleSubmit(onSubmit)} icon='pen-tool'>
							Update
						</Button>
					</>
				)}
			</View>
		</Layout>
	)
}

export default UserEdit
