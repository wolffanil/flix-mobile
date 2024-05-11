import ActorScreen from '../components/screens/actor/ActorScreen'
import FavoritesScreen from '../components/screens/favorites/FavoritesScreen'
import GenreScreen from '../components/screens/genre/GenreScreen'
import HomeScreen from '../components/screens/home/Home'
import MovieScreen from '../components/screens/movie/MovieScreen'
import ProfileScreen from '../components/screens/profile/ProfileScreen'
import SearchScreen from '../components/screens/search/SearchScreen'
import TrendingScreen from '../components/screens/trending/TrendingScreen'
import { adminRoutes } from './admin.routes'
import { IRoute } from './navigation.types'

export const userRoutes: IRoute[] = [
	{
		name: 'Home',
		component: HomeScreen
	},

	{
		name: 'Trending',
		component: TrendingScreen
	},
	{
		name: 'Profile',
		component: ProfileScreen
	},
	{
		name: 'Favorites',
		component: FavoritesScreen
	},
	{
		name: 'Search',
		component: SearchScreen
	},
	{
		name: 'Genre',
		component: GenreScreen
	},
	{
		name: 'Movie',
		component: MovieScreen
	},
	{
		name: 'Actor',
		component: ActorScreen
	}
]

export const routes = [...userRoutes, ...adminRoutes]
