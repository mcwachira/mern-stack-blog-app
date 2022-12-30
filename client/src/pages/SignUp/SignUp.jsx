import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './signUp.css'
import axios from 'axios'
const SignUp = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",

    })

    const Navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('/api/v1/create', formData)

            if (res.data) {

                Navigate('/signin')
            }
        } catch (error) {
            console.log(error)
        }






    }
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input name='username' className="registerInput" type="text" placeholder="Enter your username..." onChange={handleChange} />
                <label>Email</label>
                <input name='email' className="registerInput" type="text" placeholder="Enter your email..." onChange={handleChange} />
                <label>Password</label>
                <input name='password' className="registerInput" type="password" placeholder="Enter your password..." onChange={handleChange} />
                <label>Confirm Password</label>
                <input name='confirmPassword' className="registerInput" type="password" placeholder="repeat password..." onChange={handleChange} />
                <button className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">Login</button>
        </div>
    )
}

export default SignUp