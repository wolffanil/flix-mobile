import { FC } from 'react'
import { View, Text, ListRenderItemInfo, Pressable, Image } from 'react-native'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import HorizontalList from '../../../ui/HorizontalList'
import { getMediaSource } from '../../../../utils/getMediaSource'
import { IActor } from '../../../../shared/types/actor.interface'

const ActorCarousel: FC<{ actors: IActor[] }> = ({ actors }) => {
	const { navigate } = useTypedNavigation()

	return (
		<HorizontalList
			data={actors}
			//@ts-ignore
			renderItem={({ item: actor }: ListRenderItemInfo<IActor>) => (
				<Pressable
					onPress={() =>
						navigate('Actor', {
							slug: actor.slug
						})
					}
					className='flex-row items-center rounded-xl overflow-hidden w-48 mr-4'
					style={{
						height: 72,
						backgroundColor: 'rgba(255,255,255, 0.2)'
					}}
				>
					<Image
						className='h-full'
						style={{ width: 50, resizeMode: 'cover' }}
						source={getMediaSource(actor.photo)}
					/>
					<View className='p-3 w-11/12'>
						<Text className='text-white text-base font-medium pr-7'>
							{actor.name}
						</Text>
					</View>
				</Pressable>
			)}
		/>
	)
}

export default ActorCarousel
