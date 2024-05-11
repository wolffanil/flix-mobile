import { FC } from 'react'
import { View, Text } from 'react-native'
import { IAdminTableItem } from './admin-table-interface'
import cn from 'clsx'
import AdminActions from './AdminActions'

const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
	return (
		<View className='flex-row items-center bg-[#151515] bg-opacity-20 mt-4 px- rounded-lg'>
			{tableItem.items.map((value, index) => (
				<View
					className={cn('py-3 w-32 mx-2', {
						'justify-end': index === tableItem.items.length - 1
					})}
					key={value + index}
				>
					<Text className='text-white text-base' numberOfLines={1}>
						{value}
					</Text>
				</View>
			))}

			<AdminActions
				editNavigate={tableItem.editNavigate}
				removeHandler={removeHandler}
			/>
		</View>
	)
}

export default AdminTableItem
