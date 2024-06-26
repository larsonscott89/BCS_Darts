import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogIn = ({ setLoggedIn, setUsername, setUserId, setUserRole }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                }),
            })
            if (!response.ok) {
                throw new Error('Login failed')
            }
            const data = await response.json()
            console.log(data)
            localStorage.setItem('token', data.token)
            console.log(data.token)
            setLoggedIn(true);
            setUsername(data.user.username)
            setUserId(data.user._id)
            setUserRole(data.user.role)
            navigate('/home');
        } catch (error) {
            console.error('Error logging in:', error.message)
            alert('Login failed')
        }
    }

    const handleCancel = () => {
        setUser({
            username: '',
            password: '',
        })
    }

    return (
        <div className="login-page-container">
            <div className="form">
                <h1 className='signin-label'>Login</h1>
                <form className='signin-form' onSubmit={handleSubmit}>
                    <input className='signin-sheet'
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                    <label className='username-label' htmlFor="username">Username</label>

                    <input className='signin-sheet'
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>

                    <button type="submit">Login</button>
                    <button type="button" className="cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserLogIn