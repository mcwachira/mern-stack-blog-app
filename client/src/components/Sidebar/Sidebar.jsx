import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Sidebar.css'
import {
    FaTwitterSquare,
    FaPinterestSquare,
    FaInstagramSquare,
    FaFacebookSquare,
    FaSearch,
} from 'react-icons/fa'

import { Link } from 'react-router-dom'

const Sidebar = () => {

    const [categoryName, setCategoryName] = useState([])

    const fetchAllCategories = async () => {
        const results = await axios.get('/api/v1/category/get')
        setCategoryName(results.data)
    }

    useEffect(() => {

        fetchAllCategories()
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">

                    {categoryName.map((category, index) => <li key={index} className="sidebarListItem">
                        <Link className="link" to={`/?category=${category.name}`}>
                            {category.name}
                        </Link>
                    </li>)}



                </ul>
            </div>
            <div className="sidebarItems">
                <span className="sidebarTitles">
                    Follow Us
                </span>

                <div className="sidebarSocials">
                    <FaFacebookSquare className='sidebarIcon' size={30} />
                    <FaTwitterSquare className='sidebarIcon' size={30} />
                    <FaPinterestSquare className='sidebarIcon' size={30} />
                    <FaInstagramSquare className='sidebarIcon' size={30} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar