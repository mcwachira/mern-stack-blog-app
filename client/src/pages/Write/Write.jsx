import React, { useContext, useState } from 'react'
import './write.css'
import { FaPlus } from 'react-icons/fa'
import { UserContext } from '../../context/Context'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const Write = () => {


    const { user } = useContext(UserContext)

    const [username, setUsername] = useState("")
    const [title, setTitle] = useState("")
    const [file, setFile] = useState(null)

    const [description, setDescription] = useState("")






    const handleChange = (e) => {


    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPost = {
            username: user.username,
            title: title,
            description: description,
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('name', filename)
            data.append('file', file)
            newPost.photo = filename

            try {
                await axios.post('/upload', data)
            } catch (error) {
                console.log(error)
            }

        }
        try {
            const res = await axios.post('/api/v1/post/create', newPost)

            console.log(res.data)

            if (res.data) {
                <Navigate to={`/post/${res.data._id}`} />
            }


        } catch (error) {

            console.log(error)
        }
    }
    return (
        <div className="write">
            {file && (
                <img
                    className="writeImg"
                    src={URL.createObjectURL(file)}
                    alt=""
                />
            )}

            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <FaPlus className="writeIcon" size={30} />

                    </label>
                    <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    <input
                        name='title'
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        name='description'
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    )
}

export default Write