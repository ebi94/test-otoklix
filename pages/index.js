import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CardItem from '../components/CardItem'
import { listPost } from '../services/api'

const Index = () => {
	const [dataPost, setDataPost] = useState([])

	const getListPost = async () => {
		const res = await listPost()
		const data = res ? res : []
		setDataPost(data)
	}

	useEffect(() => {
		getListPost()
	}, [])

	return (
		<Container>
			<Row>
				<Col style={{ width: '100%', margin: 10 }}>
					<Link href='/create'>
						<Button>Create Post</Button>
					</Link>
				</Col>
			</Row>
			<Row>
				{dataPost && +dataPost.length > 0
					? dataPost.map(item => (
							<Col key={item.id} sm={6} xs={6} md={4} lg={4}>
								<CardItem title={item.title} desc={item.content} id={item.id} />
							</Col>
					  ))
					: ''}
			</Row>
		</Container>
	)
}

export default Index
