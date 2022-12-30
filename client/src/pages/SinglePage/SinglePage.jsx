import React from 'react'
import './singlePage.css'
import SinglePost from '../../components/SinglePost/SinglePost'
import Sidebar from '../../components/Sidebar/Sidebar'
const SinglePage = () => {
    return (
        <div className="single">
            <SinglePost />
            <Sidebar />
        </div>
    )
}

export default SinglePage