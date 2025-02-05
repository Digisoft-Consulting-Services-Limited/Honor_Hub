import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const Login:React.FC = () => {
  const [isRegisterForm,setIsRegisterForm] =  useState(false)
  const navigate = useNavigate()
  // const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    // setError,
    
    formState: { errors, isSubmitting },
  } = useForm();



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-primary-light_yellow p-10 rounded-2xl shadow-lg w-full max-w-3xl grid md:grid-cols-2 gap-6">
        <div>
        <h1 className=" p-2 flex justify-start items-start font-semibold">HonorHub</h1>

          <h3 className="text-xl font-semibold">Welcome to Honor Hub</h3>
          <p className="text-sm text-gray-500 mt-1">
          <p className="text-sm text-gray-600 mt-4">
     Don't have an account?{' '}
      <button 
        onClick={() => navigate('/auth/register')}
        className="text-blue-600 hover:underline"
      >
        Sign up for free
      </button>
    </p>          </p>
        
        </div>
      <div className="flex flex-col items-center">
      
        { isRegisterForm ? (
          <>
          
            <button onClick={() => setIsRegisterForm(false)} className="text-primary hover:text-black text-sm mb-2">&lt; Back</button>

             <form >
             <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
             {/* First Name Field */}
          
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
            
     
             {/* Password Field */}
             <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            {...register('password', { required: 'password is required', minLength: { value: 5, message: 'password must be at least 6 characters' } })}
            type="password"
            id="password"

            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.password && <div className="text-red-500">{errors.password.message}</div>} */}

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
          <button onClick={()=>{
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

export default Login;
