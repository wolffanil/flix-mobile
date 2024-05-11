export interface IActor {
	_id: string
	photo: string
	name: string
	countMovies: string
	slug: string
}

export interface IActorEditInput extends Omit<IActor, '_id'> {}
