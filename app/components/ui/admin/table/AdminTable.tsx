import { FC } from 'react'
import { View, Text } from 'react-native'
import { IAdminTable } from './admin-table-interface'
import { ScrollView } from 'react-native'
import AdminTableHeader from './AdminTableHeader'
import Loader from '../../Loader'
import AdminTableItem from './AdminTableItem'

const AdminTable: FC<IAdminTable> = ({
	headerItems,
	isLoading,
	removeHandler,
	tableItems = []
}) => {
	return (
		<ScrollView showsHorizontalScrollIndicator={false} horizontal>
			<View className='pb-6'>
				<AdminTableHeader headerItems={headerItems} />
				{isLoading ? (
					<Loader />
				) : tableItems?.length ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						{tableItems.map(tableItem => (
							<AdminTableItem
								key={tableItem._id}
								removeHandler={() => removeHandler(tableItem._id)}
								tableItem={tableItem}
							/>
						))}
					</ScrollView>
				) : (
					<Text className='text-white text-lg'>Elements not found</Text>
				)}
			</View>
		</ScrollView>
	)
}

export default AdminTable
