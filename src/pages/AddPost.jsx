import React from 'react'
import {Container, PostForm} from '../components'

function AddPost() {
  return (
    <div className='py-12 bg-gradient-to-br from-teal-50 to-emerald-50 min-h-screen'>
        <Container>
            <h1 className="text-4xl font-bold text-center text-teal-800 mb-12">Add New Post</h1>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost