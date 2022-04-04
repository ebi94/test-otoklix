const baseUrl = 'https://limitless-forest-49003.herokuapp.com'
const headers = new Headers()
headers.append('Content-Type', 'application/json')

const listPost = () => {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	}
	return fetch(`${baseUrl}/posts`, requestOptions).then(async r => {
		let result
		try {
			result = await r.json()
		} catch (e) {
			result = {}
		}
		return result
	})
}

const createPost = values => {
	const requestBody = {
		title: values && values.title,
		content: values && values.content
	}
	const requestOptions = {
		method: 'POST',
        headers,
		body: JSON.stringify(requestBody),
		redirect: 'follow'
	}
	return fetch(`${baseUrl}/posts`, requestOptions).then(async r => {
		let result
		try {
			result = await r.json()
		} catch (e) {
			result = {}
		}
		return result
	})
}

const editPost = (id, values) => {
	const requestBody = {
		title: values && values.title,
		content: values && values.content
	}
	const requestOptions = {
		method: 'PUT',
        headers,
		body: JSON.stringify(requestBody),
		redirect: 'follow'
	}
	return fetch(`${baseUrl}/posts/${id}`, requestOptions).then(async r => {
		let result
		try {
			result = await r.json()
		} catch (e) {
			result = {}
		}
		return result
	})
}

const deletePost = id => {
	const requestOptions = {
		method: 'DELETE',
		redirect: 'follow'
	}
	return fetch(`${baseUrl}/posts/${id}`, requestOptions).then(async r => {
		let result
		try {
			result = await r.json()
		} catch (e) {
			result = {}
		}
		return result
	})
}

const detailPost = id => {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	}
	return fetch(`${baseUrl}/posts/${id}`, requestOptions).then(async r => {
		let result
		try {
			result = await r.json()
		} catch (e) {
			result = {}
		}
		return result
	})
}

export { listPost, createPost, editPost, deletePost, detailPost }
