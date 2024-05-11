import { View, Text } from 'react-native'
import CountUsers from './CountUsers'
import PopularMoives from './PopularMoives'

const Statistics = () => {
	return (
		<View className='flex items-stretch'>
			<CountUsers />
			<PopularMoives />
		</View>
	)
}

export default Statistics
