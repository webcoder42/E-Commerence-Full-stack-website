import React, { useState } from 'react';
import Layout from '../../componenets/layout/layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    // Form Function//
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forget-password', {
                email,
                newPassword,
                answer,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error); // Logging error for development
            toast.error('Something went wrong! Try again');
        }
    };

    return (
        <Layout title={'Forget Password - E-commerce app'}>
            <div className='form_container'>
                <form onSubmit={handleSubmit}>
                    <h4>Reset Password</h4>
                    <div className='mb-3'>
                        <input
                            type='email'
                            className='form-control'
                            id='exampleInputEmail1'
                            placeholder='Enter Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            id='exampleInputMotherName'
                            placeholder='Enter Your Mother Name'
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            id='exampleInputPassword1'
                            placeholder='Enter Your New Password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-primary'>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default ForgetPassword;
