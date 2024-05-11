import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'
import { AdminService } from '../../../../../services/admin.service'
import { useScaleOnMount } from '../../../../../hooks/useScaleOnMount'
import { Loader } from '../../../../ui'
import Animated from 'react-native-reanimated'
import { STYLE_BLOCK } from './statistics.styles'

const CountUsers = () => {
	const { isLoading, data } = useQuery(['get count users'], () =>
		AdminService.getCountUsers()
	)

	const { styleAnimation } = useScaleOnMount()

	return (
		<View className={`items-center justify-center ${STYLE_BLOCK}`}>
			{isLoading ? (
				<Loader />
			) : (
				<Animated.Text
					className='text-7xl mb-1 font-medium text-white'
					style={styleAnimation}
				>
					{data}
				</Animated.Text>
			)}
			<Animated.Text
				className='opacity-70 text-xl text-white'
				style={styleAnimation}
			>
				users
			</Animated.Text>
		</View>
	)
}

export default CountUsers
