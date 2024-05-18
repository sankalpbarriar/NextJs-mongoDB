"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100">
            <div className="flex flex-col items-center justify-center p-6 m-3 border border-white shadow-lg w-full max-w-md rounded-lg bg-white">
                <h1 className="text-3xl py-3 my-4 text-black font-semibold tracking-widest">
                    {loading ? "Processing.." : "LOGIN"}
                </h1>
                <hr className="w-full mb-4" />
                <label className="text-black w-full mb-2" htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="test@test.com"
                />
                <label className="text-black w-full mb-2" htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="123456"
                />
                <button
                    className={`p-2 px-5 border border-gray-500 text-black hover:text-white rounded-lg mb-8 focus:outline-none focus:border-gray-600 hover:bg-black duration-300 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={onLogin}
                    disabled={buttonDisabled}
                >
                    Login
                </button>
                <p className="text-black">
                    Don't have an account? <Link className="text-orange-600" href="/signup">Signup</Link>
                </p>
            </div>
        </div>
    )

}