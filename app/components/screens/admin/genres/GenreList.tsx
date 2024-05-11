import { AdminHeader, AdminNavigation, AdminTable, Layout } from '../../../ui'
import { useGenres } from './useGenres'

const GenreList = () => {
	const { control, isLoading, data, deleteAsync, createAsync } = useGenres()

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Genres' />
			<AdminHeader control={control} onPress={createAsync} />
			<AdminTable
				tableItems={data}
				isLoading={isLoading}
				headerItems={['Name', 'Slug']}
				removeHandler={deleteAsync}
			/>
		</Layout>
	)
}

export default GenreList
