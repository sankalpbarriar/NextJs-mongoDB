"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdOutlineDisabledByDefault } from "react-icons/md";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push('/login');
      toast.success('account created')
    } catch (error: any) {
      console.log('Signup failed');
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100'>
      <div className='flex flex-col items-center justify-center p-6 m-3 border border-white shadow-lg w-full max-w-md rounded-lg bg-white'>
        <h1 className="text-3xl py-3 my-4 text-black font-semibold tracking-widest text-center">
          {loading ? "loading.." : "SIGNUP"}
        </h1>
        <hr className="w-full mb-5" />
        <label className='text-black w-full mb-2' htmlFor='username'>Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
          placeholder='Enter your username'
          id='username'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type='text'
        />
        <label className='text-black w-full mb-2' htmlFor='email'>Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
          placeholder='Enter your email'
          id='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type='email'
        />
        <label className='text-black w-full mb-2' htmlFor='password'>Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
          placeholder='Enter your password'
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type='password'
        />
        <button
          className={`p-2 px-5 border border-gray-500 text-black hover:text-white rounded-lg mb-8 focus:outline-none focus:border-gray-600 hover:bg-black duration-300 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No signup" : "Signup"}
        </button>
        <p className="text-black text-center">Already have an account? <Link className="text-orange-600" href="/login">Login</Link></p>
      </div>
    </div>
  );
}
