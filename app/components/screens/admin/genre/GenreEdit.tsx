import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { IGenreEditInput } from '../../../../shared/types/genre.interface'
import { useGenreEdit } from './useGenreEdit'
import {
	AdminNavigation,
	Button,
	Field,
	Layout,
	Loader,
	SlugWrapper,
	TextEditor
} from '../../../ui'
import { generateSlug } from '../../../../utils/generateSlug'

const GenreEdit = () => {
	const { control, setValue, handleSubmit, getValues } =
		useForm<IGenreEditInput>({
			mode: 'onChange'
		})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Edit genre' isBackButton />
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						<Field<IGenreEditInput>
							control={control}
							name='name'
							placeholder='Enter name'
							rules={{
								required: 'Name is required!'
							}}
						/>

						<SlugWrapper
							generate={() => setValue('slug', generateSlug(getValues('name')))}
						>
							<Field<IGenreEditInput>
								control={control}
								name='slug'
								placeholder='Enter slug'
								rules={{
									required: 'Slug is required!'
								}}
							/>
						</SlugWrapper>

						<Controller
							control={control}
							name='description'
							defaultValue=''
							render={({
								field: { onChange, value },
								fieldState: { error }
							}) => (
								<TextEditor
									onChange={onChange}
									value={value}
									error={error}
									placeholder='Enter description here'
								/>
							)}
							rules={{
								validate: {
									required: value => {
										const replaceHTML = value.replace(/<(.|\n)*?/g, '').trim()
										const replaceWhiteSpace = replaceHTML
											.replace(/&nbsp;/g, '')
											.trim()

										return (
											replaceWhiteSpace.length > 0 || 'Description is required!'
										)
									}
								}
							}}
						/>

						<Button onPress={handleSubmit(onSubmit)} icon='pen-tool'>
							Update
						</Button>
					</ScrollView>
				)}
			</View>
		</Layout>
	)
}

export default GenreEdit
