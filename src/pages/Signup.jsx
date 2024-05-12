import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import googleLogo from "../assets/google-logo.svg";
import fbLogo from "../assets/facebook-log.svg";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [resetEmail, resetSetEmail] = useState("");
  const [resetPassword, resetSetPassword] = useState("");
  const { signUpWithGmail, createUser } = useContext(AuthContext);

  console.log(signUpWithGmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  // login with email password
  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setConfirmationMessage("Signup successful!");
        // Clear input fields
        resetSetEmail("");
        resetSetPassword("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        setErrorMessage(errorMessage); // Set error message
        // ..
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">
                Please Create An Account
              </h1>
            </div>

            {confirmationMessage && (
              <div className="text-green-600">{confirmationMessage}</div>
            )}

            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSignup}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-xl"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-xl"
                    placeholder="Password"
                    required
                  />
                </div>
                <div>
                  <p className="text-base">
                    If you have an account. Please{" "}
                    <Link to="/login" className="underline text-blue-600">
                      Login Now
                    </Link>{" "}
                    here
                  </p>
                </div>
                <div className="relative ">
                  <button
                    type="submit"
                    className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl "
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* social login */}
          <div>
            <hr />
            <div className="flex w-full items-center flex-col mt-16 gap-3">
              <button onClick={handleRegister} className="block">
                {" "}
                <img
                  src={googleLogo}
                  alt=""
                  className="w-12 h-12 inline-block"
                />
                Log in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
