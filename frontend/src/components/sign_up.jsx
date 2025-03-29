import React, {useState} from 'react';
import axios from 'axios';
import '../styles/sign_up.css'
import {href} from "react-router-dom";

function SignUp() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(!formData.email || !formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.password) {
            alert("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setError('')
        axios.post('http://localhost:8084/users', formData)
            .then(response =>{
                const userId = response.data.id;
                sessionStorage.setItem('userId', userId);
                localStorage.setItem('userId', userId);
                console.log(userId)
                console.log(response.data)
                console.log(sessionStorage, 'hiiii')
                alert("User registered successfully!");
                window.location.href = "/post_jobs";
                console.log(sessionStorage, 'hiiii')
            })

            .catch(error => {
                console.error('There was an error!', error);
                if (error.response && error.response.data.message === 'Email or Phone Number already in use.') {
                    setError('This email or phone number is already registered. Please use a different one.');
                } else {
                    setError('Registration failed. Please try again.');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="signup-container">
            <div className="signup-header">
                <h1>Sign Up Page</h1>
                <p>This is the Sign Up page.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input value={formData.firstName}
                           onChange={handleChange}
                           type="firstName"
                           id="firstName"
                           name="firstName"
                           placeholder="Enter first name"
                    />
                </div>
                <div>
                    <input value={formData.lastName}
                           onChange={handleChange}
                           type="lastName"
                           id="lastName"
                           name="lastName"
                           placeholder="Enter last name"
                    />
                </div>
                <div>
                    <input
                        type="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        id="phoneNumber"
                        placeholder="Enter your phoneNumber"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="Enter email"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="Enter password"
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Sign Up</button>
                </div>
            </form>

        </div>
    )
}

export default SignUp;

