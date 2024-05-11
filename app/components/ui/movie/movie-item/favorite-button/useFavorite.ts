import { useEffect, useState } from 'react'
import { useFavorites } from '../../../../screens/favorites/useFavorites'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserService } from '../../../../../services/user.service'

export const useFavorite = (movieId: string) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoriteMovies } = useFavorites()

	useEffect(() => {
		if (!favoriteMovies) return

		const isHasMovie = favoriteMovies.some(f => f._id === movieId)

		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
	}, [favoriteMovies, isSmashed, movieId])

	const queryClient = useQueryClient()

	const { mutate: toggleFavorites } = useMutation(
		['update favorites'],
		() => UserService.toggleFavorites(movieId),
		{
			async onSuccess() {
				await queryClient.invalidateQueries(['favorite movies'])
			}
		}
	)

	return {
		isSmashed,
		toggleFavorites
	}
}
