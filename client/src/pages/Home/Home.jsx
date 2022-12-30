import React, { useState, useEffect } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/Sidebar/Sidebar'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])
    const location = useLocation()
    const { search } = location
    //fetch posts

    const getPosts = async () => {

        const response = await axios.get('/api/v1/posts/' + search)
        setData(response.data)
    }

    useEffect(() => {
        getPosts()

    }, [search])
    return (
        <>
            <Header />

            <div className="home">
                <Posts data={data} />
                <Sidebar />
            </div>
        </>
    )
}

export default Home