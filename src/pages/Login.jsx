import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import googleLogo from '../assets/google-logo.svg';
import fbLogo from '../assets/facebook-log.svg';
import { getAuth } from "firebase/auth";

export default function Login() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');

    const { signUpWithGmail, login } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    // login with google
    const handleRegister = () => {
        signUpWithGmail().then((result) => {
            const user = result.user;
            navigate(from, { replace: true });
        }).catch((error) => console.log(error));
    };

    // login with email password
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password).then((result) => {
            const user = result.user;
            console.log(user);
            alert("Login successful!");
            navigate(from, { replace: true });
        }).catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    };

    // handle forgot password
    const handleForgotPassword = () => {
        navigate('/reset-password');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-3xl font-semibold">Please Login to Dashboard</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Email address"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div>
                                    <p>{ErrorMessage ? <span className='text-blue-500 text-sm'>Email or Username is not valid!</span> : ''}</p>
                                    <p className='text-base mt-1'>If you haven't an account. Please create here <Link to='/create-user' className='underline text-blue-600'>Sign Up</Link></p>
                                </div>
                                <div className='flex gap-2 justify-around'>
                                    <div className="relative">
                                        <button type='submit' className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl">Login</button>
                                    </div>
                                    <div className="relative">
                                        <button type='button' onClick={handleForgotPassword} className="px-6 py-2 text-red-700 font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl">Forgot password</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* social login */}
                    <div>
                        <hr />
                        <div className="flex w-full items-center flex-col mt-5 gap-3">
                            <button onClick={handleRegister} className='block'>
                                <img src={googleLogo} alt="" className='w-12 h-12 inline-block' />Log in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
