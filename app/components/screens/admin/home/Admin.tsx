import { ScrollView } from 'react-native'
import { AdminNavigation, Layout } from '../../../ui'
import Statistics from './statistics/Statistics'

const AdminScreen = () => {
	return (
		<Layout isHasPadding>
			<AdminNavigation title='Statistics' />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Statistics />
			</ScrollView>
		</Layout>
	)
}

export default AdminScreen
