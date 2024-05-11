import { PressableProps, ViewStyle } from 'react-native'
import { TypeFeatherIconNames } from '../../../shared/types/icons.type'

export interface IBlurButton extends PressableProps {
	color?: string
	style?: ViewStyle
	icon?: TypeFeatherIconNames
	iconSize?: number
	isSmall?: boolean
}
