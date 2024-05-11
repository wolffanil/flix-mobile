import { request } from './api/request.api'

export const MediaService = {
	async upload(file: FormData, folder?: string) {
		return request<{ url: string; name: string }[]>({
			url: '/files',
			method: 'POST',
			data: file,
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}
