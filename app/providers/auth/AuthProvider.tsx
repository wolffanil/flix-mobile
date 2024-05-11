import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { IContext, TypeUserState } from './auth-provider.interface'
import { IUser } from '../../shared/types/user.interface'
import {
	getAccessToken,
	getUserFromStorage
} from '../../services/auth/auth.helper'

export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>({} as IUser)

	useEffect(() => {
		let isMounted = true

		const checkAccessToken = async () => {
			try {
				const accessToken = await getAccessToken()

				if (accessToken) {
					const user = await getUserFromStorage()

					if (isMounted) setUser(user)
				}
			} catch (error) {
			} finally {
				await SplashScreen.hideAsync()
			}
		}

		let ignore = checkAccessToken()

		return () => {
			isMounted = false
		}
	}, [])

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
