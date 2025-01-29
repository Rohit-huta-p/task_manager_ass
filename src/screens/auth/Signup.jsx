import React, { useContext, useState } from 'react';
import {InputField, AuthButton, Label} from '../../components/FormInputs'
import axiosInstance from '../../utils/axiosInstance';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
  const {
    isLoading, setIsLoading, 
    message, setMessage,
    // !Error Message
    errorMessage,setErrorMessage
  } = useContext(GlobalContext);


  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await axiosInstance.post('/api/user/signup', signUpData)
        if(response.statusText === 'Created'){
          navigate('/login')
          setIsLoading(false)
        }

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
    <div>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an account</h2>

        {/* Error message */}
        {errorMessage && <p className='text-red-700 text-center font-bold'>Error: {errorMessage}</p>}

        <form className="space-y-4">
            <div>
                <Label htmlFor={'name'} labelName={'Full Name'}/>

                <InputField 
                        type={'text'} 
                        id={'name'} 
                        name={'name'} 
                        placeholder={'John Doe'}
                        required={true}
                        value={signUpData.name}
                        setData={setSignUpData}
                />
            </div>
            <div>
                <Label htmlFor={'email'} labelName={'Email'}/>

                <InputField 
                        type={'email'} 
                        id={'email'} 
                        name={'email'} 
                        placeholder={'username@mail.com'}
                        required={true}
                        value={signUpData.email}
                        setData={setSignUpData}
                />
            </div>

          <div>
            <Label htmlFor={'email'} labelName={'Password'}/>

                <InputField 
                        type={'password'} 
                        id={'password'} 
                        name={'password'} 
                        placeholder={'Create new password'}
                        required={true}
                        value={signUpData.password}
                        setData={setSignUpData}
                />
          </div>


          <AuthButton 
            type="submit"
            buttonName="Register"
            onClick={handleSignUp}
            isLoading={isLoading}
          />
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Signup
