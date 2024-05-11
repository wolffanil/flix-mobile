import { AntDesign } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { AuthService } from '../../../services/auth/auth.service'
import { useAuth } from '../../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { IAuth } from '../../../shared/types/auth.interface'
import { useProfile } from './useProfile'
import AuthFields from '../auth/AuthFields'
import { Button, DismissKeyboard, Heading, Layout, Loader } from '../../ui'
import { useScaleOnMount } from '../../../hooks/useScaleOnMount'
import Animated from 'react-native-reanimated'

const Profile: FC = () => {
	const { setUser } = useAuth()
	const { handleSubmit, setValue, control } = useForm<IAuth>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit, isUpdatingProfile } = useProfile(setValue)

	const { styleAnimation } = useScaleOnMount()

	return (
		<DismissKeyboard>
			<Layout isHasPadding>
				<Heading title='Profile' />

				<Animated.View
					style={styleAnimation}
					className='my-6 justify-center items-center'
				>
					<Image
						source={require('./avatar-guest.jpg')}
						className='w-40 h-40 rounded-2xl'
					/>
				</Animated.View>

				{isLoading ? (
					<Loader />
				) : (
					<View className='mb-10'>
						<AuthFields control={control} />
						<Button
							onPress={handleSubmit(onSubmit)}
							icon={'edit'}
							disabled={isUpdatingProfile}
						>
							Update profile
						</Button>
					</View>
				)}

				<Pressable
					onPress={() => AuthService.logout().then(() => setUser(null))}
					className='opacity-40 items-center flex-row justify-end'
				>
					<AntDesign name={'logout'} size={18} color='white' />
					<Text className='text-white text-lg ml-2'>Logout</Text>
				</Pressable>
			</Layout>
		</DismissKeyboard>
	)
}

export default Profile
