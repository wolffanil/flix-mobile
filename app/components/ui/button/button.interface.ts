import { PressableProps } from 'react-native'
import { TypeFeatherIconNames } from '../../../shared/types/icons.type'

export interface IButton extends PressableProps {
	className?: string
	icon?: TypeFeatherIconNames
}
