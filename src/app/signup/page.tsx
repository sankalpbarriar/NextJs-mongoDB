"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);       //abhi kuch load ho rha hai to signup button ko disable kar do
      const response = await axios.post("/api/users/signup", user)  //sending post request using axios
      // to "api/users/signup"   
      console.log("Signup sucess", response.data);
      router.push('/login')   //pushing user to login route

    } catch (error: any) {
      console.log('Signup failed');
      toast.error(error.message)
    }
  }

  //it runs on mounting
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else setButtonDisabled(true);
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Loading":"Signup"}</h1>
      <hr/>
      <label htmlFor='username'>Username</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      placeholder='enter your username'
      id='username'
      value={user.username}
      onChange={(e)=>setUser({...user,username: e.target.value})}
      type='text'/>

      <label htmlFor='username'>Email</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      placeholder='enter your email'
      id='email'
      value={user.email}
      onChange={(e)=>setUser({...user,email: e.target.value})}
      type='email'/>

      <label htmlFor='username'>Password</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      placeholder='enter your username'
      id='password'
      value={user.password}
      onChange={(e)=>setUser({...user,password: e.target.value})}
      type='password'/>

      <button
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600'
      onClick={onSignup}>
        {buttonDisabled ? "No signup": "Signup"}       
        {/* TODO- change opacity when diabled */}
      </button>
      <Link href="/login">Visit login Page</Link>
    </div>
  )
}

