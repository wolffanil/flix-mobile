import { AdminHeader, AdminNavigation, AdminTable, Layout } from '../../../ui'
import { useActors } from './useActors'

const ActorList = () => {
	const { control, isLoading, data, deleteAsync, createAsync } = useActors()

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Actors' />
			<AdminHeader control={control} onPress={createAsync} />
			<AdminTable
				tableItems={data}
				isLoading={isLoading}
				headerItems={['Name', 'Count movies']}
				removeHandler={deleteAsync}
			/>
		</Layout>
	)
}

export default ActorList
