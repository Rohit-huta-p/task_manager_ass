import React, { useContext, useState } from "react";
import {InputField, AuthButton, Label} from '../../components/FormInputs'
import { GlobalContext } from "../../contexts/GlobalContext.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const {
      user, setUser,
      setIsLoggedIn,
      isLoading, setIsLoading, 
      message, setMessage,
      // !Error message State
      errorMessage,setErrorMessage
    } = useContext(GlobalContext);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    console.log(loginData);
    
    const navigate = useNavigate();
    const handleLogin = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axiosInstance.post('/api/user/login', loginData);

          console.log(response);
              const { token } = await response.data;
              
              // Decode the token to get expiry time
              const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
              
              const expiryTime = exp * 1000; // Convert to milliseconds

          
              // Store token and expiry time in localStorage
              localStorage.setItem("authToken", token);
              localStorage.setItem("authTokenExpiry", expiryTime.toString());
              navigate('/')

              setIsLoggedIn(true);
              setIsLoading(false);

            
          } catch (error) {
            if (error.response) {
              setErrorMessage(error.response.data.error); // Set the error message
              setIsLoading(false)
            } else {
              setErrorMessage("An unknown error occurred"); // Fallback message
              setIsLoading(false)
            }
              
          }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        
        {errorMessage && <p className='text-red-700 text-center font-bold'>Error: {errorMessage}</p>}

        <form className="space-y-4">
          <div>
            <Label htmlFor="email" labelName="Email" />
            <InputField
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={loginData.email}
              setData={setLoginData}
            />
          </div>



          <div>
            <Label htmlFor="password" labelName="Pasword" />
            <InputField
              type="password"
              id="pasword"
              name="password"
              placeholder="Enter New password"
              required
              value={loginData.password}
              setData={setLoginData}
            />
          </div>


         <AuthButton 
            type="submit"
            buttonName="Log In"
            onClick={handleLogin}
            isLoading={isLoading}
         />
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;