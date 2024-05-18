import React from 'react';

export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mx-4 transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
                    <img src="/avatar.svg" alt="Profile" className="w-28 h-34 rounded-full shadow-md" />
                </div>
                <p className="text-2xl font-semibold text-black text-center mb-4">
                    <span className=" rounded text-black">Welcome {params.id}</span>
                </p>
                <hr className="my-4 border-gray-300" />
                <div className="text-center">
                    <p className="text-xl text-gray-700 mb-4">This is your user information</p>

                </div>
            </div>
        </div>
    );
}
