'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmailPage() {

    // const router = useRouter();
        
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)


    //token le ke bhejna hai
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
            setError(false);
        } catch (error: any) {
            setError(true)
            console.log(error.response.data);
        }
    }

    //jaise hi koi user is page pe aaya tabhi url se token nikal le
    useEffect(() => {
        setError(false);
        //extracting token from URL
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // const {query}=router;
        // const urlTokenTwo=query.token

    }, [])

    // ye wala tabhi chale jab token ke andar koi changes aaye
    useEffect(() => {
        setError(false);
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 m-4 bg-yellow-600 text-black'>
                {token ? `${token}` : "no token"}
            </h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    )
}

