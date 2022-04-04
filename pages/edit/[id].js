import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { editPost, detailPost } from '../../services/api'

const Edit = props => {
	const { data } = props
    const id = data && data.id
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async values => {
		const res = await editPost(id, values)
		if (res !== undefined) {
			Swal.fire('Success', 'post has been updated ', 'success')
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

    useEffect(() => {
        if (data !== undefined) {
            const title = data && data.title;
            const content = data && data.content;
            setTitle(title);
            setContent(content);
        }
    }, [data])

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

Edit.defaultProps = {
	data: {}
}

Edit.propTypes = {
	data: PropTypes.object
}

Edit.getInitialProps = async ctx => {
	const { query } = ctx
	const id = query.id
	const res = await detailPost(id)
	return {
		data: res
	}
}

export default Edit