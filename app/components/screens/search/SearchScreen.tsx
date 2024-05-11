import { View } from 'react-native'
import { useSearch } from './useSearch'
import {
	DismissKeyboard,
	Field,
	Heading,
	Layout,
	Loader,
	MovieCatalog
} from '../../ui'
import { ISearchFormData } from './search.interface'

const SearchScreen = () => {
	const { movies, isLoading, searchTerm, control } = useSearch()

	return (
		<Layout isHasPadding>
			<DismissKeyboard>
				<Heading title='Search' />
				<View className='mt-3'>
					<Field<ISearchFormData>
						placeholder='Type something...'
						control={control}
						name='searchTerm'
						keyboardType='web-search'
					/>
				</View>
				{!!searchTerm ? (
					<View className='mt-3'>
						{isLoading ? <Loader /> : <MovieCatalog title='' movies={movies} />}
					</View>
				) : null}
			</DismissKeyboard>
		</Layout>
	)
}

export default SearchScreen
