import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './signIn.css'
import { UserContext } from '../../context/Context'
const SignIn = () => {
    const [formData, setFormData] = useState({

        email: "",
        password: "",


    })

    const Navigate = useNavigate()

    const { dispatch, isFetching } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: 'LOGIN_START' })

        try {
            const res = await axios.post('/api/v1/login', formData)
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
            Navigate('/')

        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' })
            console.log(error)
        }
    }


    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Email</label>
                <input name='email' className="loginInput" type="text" placeholder="Enter your email..." onChange={handleChange} />
                <label>Password</label>
                <input name='password' className="loginInput" type="password" placeholder="Enter your password..." onChange={handleChange} />

                <button className="loginButton" >Login</button>
            </form>
            <button className="loginRegisterButton">Register</button>
        </div>
    )
}

export default SignIn