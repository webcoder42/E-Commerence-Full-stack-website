import React, { useState } from 'react';
import Layout from './../../componenets/layout/layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../style/authStyle.css";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  //Form Function//
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error('Wrong email or password');
      }
    }
  };
  
 

  return (
    <Layout title={'Login E-Commerce'}>
      <div className='form_container'>
        
        <form onSubmit={handleSubmit}>
        <h4 className='title'>Register Form</h4>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              placeholder='Enter Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              placeholder='Phone No'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              placeholder='What is your mother name'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
