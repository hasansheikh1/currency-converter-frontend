import React, { useState } from 'react'
import '../assets/css/Login.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import apiClient from '../shared/apiClient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const[error,setError]=useState("")
    const [isLoading, setisLoading] = useState(false);


    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 2) newErrors.password = 'Password must be at least 2 characters';
        return newErrors;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            console.log('Login attempted with:', { email, password });
            const userData = {
                email: email, password: password
            }
            console.log("user data", userData)
            setisLoading(true)
            apiClient.post('/user/login', userData).then((res) => {
                    toast.success("Login Successful")
                    sessionStorage.setItem("auth_token", res.data.token)
            setisLoading(false)
                    
                    navigate('/home')
                
            }).catch((err) => {
                console.log("Error", err)
                setisLoading(false)
                setError(err?.response?.data?.message)
            })

            // Here you would typically send a request to your server
        }
    };


    return (
        <div className="login-wrapper">
            <div className="login-form-container">
                <h2 className="login-title">Login</h2>
                {error&&
                <span className='api-error'>{error}</span>

                }
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Button variant="primary" type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? <> Login <Spinner size='sm' as="span" animation="border" /></> : 'Login'}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login