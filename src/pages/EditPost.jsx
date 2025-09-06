import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            })
        } else {
            navigate('/');
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-12 bg-gradient-to-br from-teal-50 to-emerald-50 min-h-screen'>
        <Container>
            <h1 className="text-4xl font-bold text-center text-teal-800 mb-12">Edit Post</h1>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost