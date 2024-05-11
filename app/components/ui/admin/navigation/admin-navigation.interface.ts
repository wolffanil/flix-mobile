import { TypeRootStackParamList } from '../../../../navigation/navigation.types'
import { TypeMaterialIconNames } from '../../../../shared/types/icons.type'

export interface INavItem {
	icon: TypeMaterialIconNames
	title: string
	routeName: keyof TypeRootStackParamList
}
