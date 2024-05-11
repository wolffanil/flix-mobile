import { useMovies } from './useMovies'
import { AdminHeader, AdminNavigation, AdminTable, Layout } from '../../../ui'

const MovieList = () => {
	const { control, isLoading, data, deleteAsync, createAsync } = useMovies()

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Movies' />
			<AdminHeader control={control} onPress={createAsync} />
			<AdminTable
				tableItems={data}
				isLoading={isLoading}
				headerItems={['Title', 'Main genre', 'Rating']}
				removeHandler={deleteAsync}
			/>
		</Layout>
	)
}

export default MovieList
