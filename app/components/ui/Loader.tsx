import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Loader = () => {
	return (
		<SafeAreaView>
			<ActivityIndicator size='large' color='#BF3335' />
		</SafeAreaView>
	)
}

export default Loader
