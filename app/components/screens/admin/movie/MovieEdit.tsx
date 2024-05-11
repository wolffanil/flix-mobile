import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { IMovieEditInput } from '../../../../shared/types/movie.interface'
import { useMovieEdit } from './useMovieEdit'
import {
	AdminNavigation,
	Button,
	DropDown,
	Field,
	Layout,
	Loader,
	SlugWrapper,
	UploadField
} from '../../../ui'
import { generateSlug } from '../../../../utils/generateSlug'
import { useAdminGenres } from './useAdminGenres'
import { useAdminActors } from './useAdminActors'

const MovieEdit = () => {
	const { control, setValue, handleSubmit, getValues } =
		useForm<IMovieEditInput>({
			mode: 'onChange'
		})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	const { isLoading: isGenresLoading, data: genres } = useAdminGenres()
	const { isLoading: isActorsLoading, data: actors } = useAdminActors()

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Edit movie' isBackButton />
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: 100
						}}
					>
						<Field<IMovieEditInput>
							control={control}
							name='title'
							placeholder='Enter name'
							rules={{
								required: 'Name is required!'
							}}
						/>

						<SlugWrapper
							generate={() =>
								setValue('slug', generateSlug(getValues('title')))
							}
						>
							<Field<IMovieEditInput>
								control={control}
								name='slug'
								placeholder='Enter slug'
								rules={{
									required: 'Slug is required!'
								}}
							/>
						</SlugWrapper>

						<Field<IMovieEditInput>
							control={control}
							name='parameters.country'
							placeholder='Enter country'
							rules={{
								required: 'Country is required!'
							}}
						/>

						<View className='flex-row flex-wrap justify-between'>
							<View style={{ width: '56%' }}>
								<Field<IMovieEditInput>
									control={control}
									name='parameters.duration'
									placeholder='Enter duration (min.)'
									rules={{
										required: 'Duration is required!'
									}}
								/>
							</View>

							<View style={{ width: '40%' }}>
								<Field<IMovieEditInput>
									control={control}
									name='parameters.year'
									placeholder='Enter year'
									rules={{
										required: 'Year is required!'
									}}
									keyboardType='number-pad'
								/>
							</View>
						</View>

						<Controller
							control={control}
							name='genres'
							render={({ field, fieldState: { error } }) => (
								<DropDown
									field={field}
									options={genres}
									isLoading={isGenresLoading}
									isMulti
									error={error}
									style={{
										zIndex: 11
									}}
								/>
							)}
							rules={{
								required: 'Please select at least one genre!'
							}}
						/>

						<Controller
							control={control}
							name='actors'
							render={({ field, fieldState: { error } }) => (
								<DropDown
									field={field}
									options={actors}
									isLoading={isActorsLoading}
									isMulti
									error={error}
								/>
							)}
							rules={{
								required: 'Please select at least one actor!'
							}}
						/>

						<Controller
							control={control}
							name='poster'
							defaultValue=''
							render={({
								field: { onChange, value },
								fieldState: { error }
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder='movies'
									placeholder='Poster'
								/>
							)}
							rules={{
								required: 'Poster is required!'
							}}
						/>

						<Controller
							control={control}
							name='videoUrl'
							defaultValue=''
							render={({
								field: { onChange, value },
								fieldState: { error }
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder='movies'
									placeholder='Video'
									isNoImage
									gradient={['#4361a6', '#254584']}
								/>
							)}
							rules={{
								required: 'Video is required!'
							}}
						/>

						<Button
							onPress={handleSubmit(onSubmit)}
							icon='pen-tool'
							disabled={isLoading}
						>
							Update
						</Button>
					</ScrollView>
				)}
			</View>
		</Layout>
	)
}

export default MovieEdit
