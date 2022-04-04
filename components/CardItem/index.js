import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Swal from 'sweetalert2'
import { TrashFill, PenFill } from 'react-bootstrap-icons'
import { deletePost } from '../../services/api'

const CardItem = props => {
	const { id, title, desc } = props

    const router = useRouter()

	const doDelete = async () => {
		const res = await deletePost(id)
		if (res !== undefined) {
			Swal.fire('Deleted!', 'Your file has been deleted.', 'success').then(result => {
                if (result.isConfirmed) {
                    router.reload(window.location.pathname)
                }
            })
		}
	}

	const handleDelete = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(result => {
			if (result.isConfirmed) {
				doDelete()
			}
		})
	}

	return (
		<Card style={{ width: '100%', margin: 5 }}>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{desc}</Card.Text>
				<div style={{ justifyContent: 'space-between', display: 'flex' }}>
					<Link href={`/detail/${id}`}>
						<Button variant='primary'>Show More . . .</Button>
					</Link>
					<Link href={`/edit/${id}`}>
						<Button variant='secondary'>
							<PenFill />
						</Button>
					</Link>
					<Button variant='danger' onClick={() => handleDelete(id)}>
						<TrashFill />
					</Button>
				</div>
			</Card.Body>
		</Card>
	)
}

export default CardItem
