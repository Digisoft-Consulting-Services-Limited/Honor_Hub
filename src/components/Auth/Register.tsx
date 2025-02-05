import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";


const Register: React.FC = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false)
  const navigate = useNavigate()
  // const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    // setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-primary-light_yellow p-10 rounded-2xl shadow-lg w-full max-w-3xl grid md:grid-cols-2 gap-6">
        <div>
          <h1 className=" p-2 flex justify-start items-start font-semibold">HonorHub</h1>

          <h3 className="text-xl font-semibold">Create Your Free Account</h3>
          <p className="text-sm text-gray-500 mt-1">
            <p>Already have an account?
              <button
                onClick={() => navigate('/auth/login')}
                className="text-blue-600 hover:underline"
              >
                Login to your Account
              </button>          </p>
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>&#x2713; View all Memorials</li>
            <li>&#x2713; Set up memorials for your loved ones</li>
            <li>&#x2713; Access memorials anytime, anywhere</li>
            <li>&#x2713; Connect with family and friends</li>
            <li>&#x2713; Access memorials anytime, anywhere</li>


          </ul>
        </div>
        <div className="flex flex-col items-center">

          {isRegisterForm ? (
            <>

              <button onClick={() => setIsRegisterForm(false)} className="text-primary hover:text-black text-sm mb-2">&lt; Back</button>

              <form >
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                {/* First Name Field */}
                <div className="mb-4">
                  <label htmlFor="first_name" className="block text-gray-700 font-medium mb-2">
                    First Name
                  </label>
                  <input
                    {...register('first_name', { required: 'First Name is required' })}
                    type="text"
                    id="first_name"
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {/* {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>} */}
                </div>
                {/* Username Field */}
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                    Username
                  </label>
                  <input
                    {...register('username', { required: 'Username is required' })}
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {/* {errors.username && <p className="text-red-500">{errors.username.message}</p>} */}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                        message: 'Invalid email format',
                      },
                    })}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {/* {errors.email && <p className="text-red-500">{errors.email.message}</p>} */}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {/* {errors.password && <div className="text-red-500">{errors.password.message}</div>} */}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => {


                        return value === password || 'Passwords do not match'; // Custom validation

                      }
                    })}
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {/* {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword.message}</div>} */}
                </div>

                {/* Success Message */}
                {/* {successMessage && <div className="text-green-500">{successMessage}</div>} */}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover_light hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loading...' : 'Submit'}
                </button>

                {/* General Error */}
                {errors.root && <div className="text-red-500">{errors.root.message}</div>}
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex space-x-4">
                {[FaGoogle].map((Icon, index) => (
                  <button key={index} className="p-2 bg-gray-200 rounded-full text-blue-700 hover:bg-gray-300">
                    <Icon size={24} />
                  </button>
                ))}
              </div>
              <div className="w-full flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-gray-500 text-sm">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>
              <button onClick={() => {
                setIsRegisterForm(true)
              }} className="w-full rounded-md py-2 px-4 bg-primary text-white hover:text-primary hover:bg-primary-hover_light" >Continue with Email</button>
            </div>
          )
          }
        </div>

      </div>
    </div>
  );
};

export default Register;
