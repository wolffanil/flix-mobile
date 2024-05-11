import { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { IGenre } from '../../../../shared/types/genre.interface'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'

const GenreList: FC<{ genres: IGenre[] }> = ({ genres }) => {
	const { navigate } = useTypedNavigation()

	return (
		<View className='flex-row gap-3'>
			{genres.map(genre => (
				<Pressable
					onPress={() =>
						navigate('Genre', {
							slug: genre.slug
						})
					}
					key={genre._id}
					className='rounded-2xl bg-gray py-1.5 px-3'
				>
					<Text className='text-white'>{genre.name}</Text>
				</Pressable>
			))}
		</View>
	)
}

export default GenreList
