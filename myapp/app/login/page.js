'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'


const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: ''
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data; 

    if (password === '' || email === '') {
      toast.error('Fill all fields!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await signIn('credentials', { email, password, redirect: false });

      if (res?.error == null) {
        router.push('/');
      } else {
        toast.error('Error occurred while logging in');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className='flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 m-auto mt-24 bg-gray-900'>
    <h2 className='self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl'>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col mb-2'>
      <div className='flex relative'>
      <input
      className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-full p-4'
        placeholder='Email'
        name='email'
        id='email'
        type='email'
        value={data.email}
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      </div>
      </div>
      <div className='flex flex-col mb-2'>
      <div className='flex relative'>
      <input
       className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-full p-4'
        placeholder='Password'
        name='password'
        id='password'
        type='password'
        value={data.password}
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
         </div>
         </div>
    
      <button
      className='py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'
      type='submit'>Login</button>
    </form>
  </section>
  )
}

export default Login