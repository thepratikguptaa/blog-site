import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 text-center bg-gradient-to-br from-teal-50 to-emerald-50 min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-4xl font-bold text-teal-800 hover:text-emerald-700 transition-colors duration-300 mb-4">
                                Welcome to My Blog Site
                            </h1>
                            <p className="text-xl text-teal-600 mb-8">
                                Login to discover amazing posts from our community
                            </p>
                            <div className="animate-bounce">
                                <Link to="/login" 
                                    className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }    return (
        <div className='w-full py-12 bg-gradient-to-br from-teal-50 to-emerald-50 min-h-screen'>
            <Container>
                <h1 className="text-4xl font-bold text-center text-teal-800 mb-12">Latest Posts</h1>
                <div className='flex flex-wrap -mx-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 transform transition-all duration-300 hover:scale-105'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home