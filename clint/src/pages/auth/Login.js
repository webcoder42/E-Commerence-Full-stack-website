import React, { useState } from 'react';
import Layout from '../../componenets/layout/layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import "../../style/authStyle.css";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  //Form Function//
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', {

        email,
        password,

      });
      localStorage.setItem('auth', JSON.stringify(res.data));
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong! Try again');
    }
  };

  return (

    <Layout title={'Login E-Commerce'}>
      <div className='form_container'>

        <form onSubmit={handleSubmit}>
          <h4>Login Form</h4>
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
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
             <div className='mb-3'>

          <button type='submit' className='btn btn-primary'>
            Login
          </button>
              </div>
                <button type='button'onClick={()=>(navigate('/forget-password'))} className='btn forgot-btn'>
                Forget Password
                </button>
         
        </form>
      </div>
    </Layout>

  )
}

export default Login