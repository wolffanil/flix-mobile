import { AdminHeader, AdminNavigation, AdminTable, Layout } from '../../../ui'
import { useUsers } from './useUsers'

const UserList = () => {
	const { control, isLoading, data, deleteAsync } = useUsers()

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Users' />
			<AdminHeader control={control} />
			<AdminTable
				tableItems={data}
				isLoading={isLoading}
				headerItems={['Email', 'Date register']}
				removeHandler={deleteAsync}
			/>
		</Layout>
	)
}

export default UserList
