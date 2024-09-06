import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function PasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = (event) => {
        event.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage('Password reset email sent!');
            })
            .catch((error) => {
                console.error('Error sending password reset email:', error);
                setMessage(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-3xl font-semibold">Reset Password</h1>
                        <form onSubmit={handlePasswordReset} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-700"
                                    placeholder="Enter Email address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <button type='submit' className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl">Send Password Reset Email</button>
                            </div>
                        </form>
                        {message && <p className="mt-4 text-green-600">{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
