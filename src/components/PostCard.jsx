import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white/90 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-teal-100'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFileView(featuredImage).toString()} alt={title}
                    className='rounded-xl hover:opacity-90 transition-opacity duration-300' />
                </div>
                <h2 className='text-xl font-bold text-teal-900 hover:text-teal-700 transition-colors duration-200'>{title}</h2>
            </div>
        </Link>
    )
}


export default PostCard