'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/aboutme");
      console.log(res.data.data._id);
      setData(res.data.data.username);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-6 md:p-12 w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Profile Page</h1>
        <hr className='mb-6 border-gray-300'/>
        <h2 className='text-xl mb-6 text-center text-gray-700'>
          {data === "nothing" ? (
            <span className='text-red-500'>NO DATA</span>
          ) : (
            <Link href={`/profile/${data}`} className='text-blue-500 underline'>{data}</Link>
          )}
        </h2>
        <hr className='mb-6 border-gray-300'/>
        <div className='flex flex-col gap-4'>
          <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out'
            onClick={logout}
          >
            Logout
          </button>
          <button 
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out'
            onClick={getUserDetails}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
