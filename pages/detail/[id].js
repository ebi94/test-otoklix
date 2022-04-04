import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import moment from 'moment'
import { detailPost } from '../../services/api'

const Detail = props => {
	const { data } = props
	return (
		<Container style={{ marginTop: 50 }}>
			<Row>
				<Col>Id: {data && data.id}</Col>
			</Row>
			<Row>
				<Col>Title : {data && data.title}</Col>
			</Row>
			<Row>
				<Col>Content: {data && data.content}</Col>
			</Row>
			<Row>
				<Col>Created at: {moment(data && data.created_at).format('DD MMMM YYYY')}</Col>
			</Row>
			<Row>
				<Col>Publish at: {moment(data && data.published_at).format('DD MMMM YYYY')}</Col>
			</Row>
			<Row>
				<Col>Edited at: {moment(data && data.updated_at).format('DD MMMM YYYY')}</Col>
			</Row>
		</Container>
	)
}

Detail.defaultProps = {
	data: {}
}

Detail.propTypes = {
	data: PropTypes.object
}

Detail.getInitialProps = async ctx => {
	const { query } = ctx
	const id = query.id
	const res = await detailPost(id)
	return {
		data: res
	}
}

export default Detail
