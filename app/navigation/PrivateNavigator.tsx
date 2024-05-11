import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TypeRootStackParamList } from './navigation.types'
import { useAuth } from '../hooks/useAuth'
import { routes, userRoutes } from './user.routes'
import AuthScreen from '../components/screens/auth/Auth'
import Screen404 from '../components/screens/system/Screen404'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator = () => {
	const { user } = useAuth()

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: '#090909'
				}
			}}
		>
			{user ? (
				user.isAdmin ? (
					routes.map(route => <Stack.Screen key={route.name} {...route} />)
				) : (
					userRoutes.map(route => <Stack.Screen key={route.name} {...route} />)
				)
			) : (
				<Stack.Screen name='Auth' component={AuthScreen} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
