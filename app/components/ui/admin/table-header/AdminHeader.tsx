import { Control } from 'react-hook-form'
import { View } from 'react-native'
import { ISearchFormData } from '../../../screens/search/search.interface'
import { FC } from 'react'
import Field from '../../form-elements/field/Field'
import AdminCreateButton from './AdminCreateButton'

interface IAdminHeader {
	onPress?: () => void
	control: Control<ISearchFormData>
}

const AdminHeader: FC<IAdminHeader> = ({ onPress, control }) => {
	return (
		<View className='flex-row items-center justify-between mb-3'>
			<View
				style={{
					width: onPress ? '82%' : '100%'
				}}
			>
				<Field<ISearchFormData>
					name='searchTerm'
					control={control}
					keyboardType='web-search'
					placeholder='Type something'
				/>
			</View>
			{onPress && <AdminCreateButton onPress={onPress} />}
		</View>
	)
}

export default AdminHeader
