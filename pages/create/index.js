import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { createPost } from '../../services/api'

const Create = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async values => {
		const res = await createPost(values)
		if (res !== undefined) {
			Swal.fire('Success', 'post has been created ', 'success')
            setLoading(false)
		}
	}

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title,
			content
		},
		onSubmit: values => {
			setLoading(true)
			handleSubmit(values)
		}
	})

	return (
		<Container style={{ marginTop: 30 }}>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicTitle'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type='text'
						placeholder='Title'
						disabled={loading}
						onChange={e => setTitle(e.target.value)}
						value={formik.values.title}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicContent'>
					<Form.Label>Content</Form.Label>
					<Form.Control
						type='text'
						placeholder='Content'
						disabled={loading}
						onChange={e => setContent(e.target.value)}
						value={formik.values.content}
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					disabled={loading}
					style={{ minWidth: 150 }}
				>
					{loading ? 'Wait a second . . .' : 'Submit'}
				</Button>
			</Form>
		</Container>
	)
}

export default Create
