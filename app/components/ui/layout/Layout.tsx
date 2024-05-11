import { FC, PropsWithChildren } from 'react'
import { View, ViewStyle, Platform } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import cn from 'clsx'
import AdminButton from './AdminButton'

interface ILayout {
	className?: string
	style?: ViewStyle
	isHasPadding?: boolean
}

const Layout: FC<PropsWithChildren<ILayout>> = ({
	style,
	className,
	isHasPadding,
	children
}) => {
	const { top } = useSafeAreaInsets()

	return (
		<SafeAreaView className='flex-1'>
			<View
				className={cn('flex-1', className, {
					'px-6': isHasPadding
				})}
				style={{
					...style,
					paddingTop: Platform.OS === 'ios' ? top / 6 : top * 0.6
				}}
			>
				{children}
			</View>
			<AdminButton />
		</SafeAreaView>
	)
}

export default Layout
