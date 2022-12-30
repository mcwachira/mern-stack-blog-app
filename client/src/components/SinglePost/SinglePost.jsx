import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import './singlepost.css'
import axios from 'axios'
import { UserContext } from '../../context/Context'
const SinglePost = () => {

    const { user } = useContext(UserContext)
    console.log(user)
    const { id } = useParams()

    const [postData, setPostData] = useState({})
    const [edit, setEdit] = useState(false)

    const [titleText, setTitleText] = useState("")
    const [description, setDescription] = useState("")

    const Navigate = useNavigate()

    const fetchPostById = async () => {
        const result = await axios.get(`/api/v1/posts/${id}`)
        setPostData(result.data)
        console.log(result.data)
    }
    useEffect(() => {

        fetchPostById()
    }, [id])

    const handleDelete = async () => {

        try {
            const result = await axios.delete(`/api/v1/post/delete/${id}`, {
                data: { username: user.username },
            })

            Navigate('/')


        } catch (error) {
            console.log(error)

        }


    }

    const handleEdit = () => (setEdit(!edit))

    const handleSubmit = async () => {

        try {
            await axios.put(`/api/v1/post/update/${postData._id}`, {
                title: titleText,
                description: description,
                username: user.username,
            })
            Navigate('/')
        } catch (error) {
            console.log(error)
        }


    }


    const { _id, title, username, categories, createdAt } = postData
    return (

        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    className="singlePostImg"
                    src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />
                {edit ? (<>
                    <input type="text" value={titleText} onChange={(e) => setTitleText(e.target.value)} />
                </>) : (<h1 className="singlePostTitle">
                    {title}
                    {username === user.username && (<div className="singlePostEdit">

                        <FaEdit className="singlePostIcon" size={30} onClick={handleEdit} />
                        <FaTrash className="singlePostIcon" size={30} onClick={handleDelete} />

                    </div>)}
                </h1>)}

                <div className="singlePostInfo">
                    <span>
                        Author:
                        <b className="singlePostAuthor">
                            <Link className="link" to={`/?user=${username}`}>
                                {username}
                            </Link>
                        </b>
                    </span>
                    <span>{new Date(createdAt).toDateString()}</span>
                </div>

                {edit ? (<>
                    <textarea
                        name='description'
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"

                        autoFocus={true}
                        onChange={(e) => setDescription(e.target.value)}
                    />


                </>) : (<>
                    <p className="singlePostDesc">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
                        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
                        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi
                        eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
                        error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto
                        impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a
                        odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
                        iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
                        a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
                        iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
                        a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
                        iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
                        a odit modi eos!
                        <br />
                        <br />
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
                        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
                        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi
                        eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
                        error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto
                        impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a
                        odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
                        iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
                        a odit modi eos! Lorem, ipsum dolor sit amet consectetur.
                    </p></>)}

                {edit ? <button type="submit" onClick={handleSubmit}>
                    Publish changes
                </button> : (<></>)}


            </div>
        </div>


    )
}

export default SinglePost