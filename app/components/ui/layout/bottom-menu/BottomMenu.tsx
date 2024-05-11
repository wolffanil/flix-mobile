import { View, Text } from 'react-native'
import { TypeNavigate } from './menu.interface'
import { FC } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { menuItems } from './menu.data'
import MenuItem from './MenuItem'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = ({ currentRoute, nav }) => {
	const { bottom } = useSafeAreaInsets()

	return (
		<View
			className='pt-5 px-2 flex-row justify-between items-center w-full border-t border-t-solid border-t-[#929292] bg-[#090909]'
			style={{
				paddingBottom: bottom + 15
			}}
		>
			{menuItems.map(item => (
				<MenuItem
					key={item.path}
					item={item}
					nav={nav}
					currentRoute={currentRoute}
				/>
			))}
		</View>
	)
}

export default BottomMenu
