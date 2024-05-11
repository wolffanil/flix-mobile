import { IActor } from './actor.interface'
import { IGenre } from './genre.interface'

export interface IParamaters {
	year: number
	duration: number
	country: string
}

export interface IMovie {
	_id: string
	poster: string
	title: string
	parameters: IParamaters
	genres: IGenre[]
	actors: IActor[]
	countOpened: number
	videoUrl: string
	rating: number
	slug: string
}

export interface IMovieEditInput extends Omit<IMovie, '_id'> {}
