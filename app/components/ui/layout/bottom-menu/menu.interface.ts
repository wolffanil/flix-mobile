import { TypeRootStackParamList } from '../../../../navigation/navigation.types'
import { TypeFeatherIconNames } from '../../../../shared/types/icons.type'

export interface IMenuItem {
	iconName: TypeFeatherIconNames
	path: keyof TypeRootStackParamList
}

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void
