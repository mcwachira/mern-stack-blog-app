import React from 'react'
import './posts.css'
import Post from '../Post/Post'
const Posts = ({ data }) => {
    console.log(data)
    return (
        <div className="posts">
            {
                data.map((pt, index) => (<Post key={index} pt={pt} />))
            }
        </div>
    )
}

export default Posts