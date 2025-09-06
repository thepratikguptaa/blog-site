import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white/90 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-teal-100/60 group overflow-hidden'>
                <div className='w-full justify-center mb-4 overflow-hidden rounded-xl'>
                    <img src={appwriteService.getFileView(featuredImage).toString()} alt={title}
                    className='rounded-xl group-hover:scale-105 transition-transform duration-300 w-full' />
                </div>
                <h2 className='text-xl font-bold text-teal-900 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600 transition-colors duration-300'>{title}</h2>
            </div>
        </Link>
    )
}


export default PostCard