import React, { useState } from 'react';
import { Layout } from '../layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:8081/api/login", {
                email,
                password
            });
    
            if (data) 
            {
                localStorage.setItem("user", JSON.stringify(data));
                toast.success("User Logged-In Successfully");
                setEmail("");
                setPassword("");
                navigate('/admin/dashboard');
            } else {
                setEmail("");
                setPassword("");
                toast.error("Invalid Username or Password");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Invalid Username or Password", error);
                toast.error("Invalid Username or Password");
            } else {
                console.error(`Error while logging in the User ${error}`);
                toast.error("An error occurred during login. Please try again later.");
            }
        }
    };
       

    return (
        <Layout>
            <div className='container login-form'>
                <div className='row'>
                    <div>
                        <h3 className='text-center text-secondary'> Admin Login Form</h3>
                        <form onSubmit={handleLogin}>
                            <div className="form-group mt-3">
                                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter email" />
                            </div>
                            <div className="form-group mt-3">
                                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
