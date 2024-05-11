import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { IActorEditInput } from '../../../../shared/types/actor.interface'
import { useActorEdit } from './useActorEdit'
import {
	AdminNavigation,
	Button,
	Field,
	Layout,
	Loader,
	SlugWrapper,
	UploadField
} from '../../../ui'
import { generateSlug } from '../../../../utils/generateSlug'

const ActorEdit = () => {
	const { control, setValue, handleSubmit, getValues } =
		useForm<IActorEditInput>({
			mode: 'onChange'
		})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Edit actor' isBackButton />
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						<Field<IActorEditInput>
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
							<Field<IActorEditInput>
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
							name='photo'
							defaultValue=''
							render={({
								field: { onChange, value },
								fieldState: { error }
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder='actors'
									placeholder='Photo'
								/>
							)}
							rules={{
								required: 'Photo is required!'
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

export default ActorEdit
