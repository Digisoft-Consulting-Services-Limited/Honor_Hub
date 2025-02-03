import { FaGoogle } from "react-icons/fa6";



const Login:React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-primary-light_yellow p-10 rounded-2xl shadow-lg w-full max-w-3xl grid md:grid-cols-2 gap-6">
        <div>
        <h1 className=" p-2 flex justify-start items-start font-semibold">HonorHub</h1>

          <h3 className="text-xl font-semibold">Create Your Free Account</h3>
          <p className="text-sm text-gray-500 mt-1">
            Already have an account? <a href="#" className="text-blue-600">Sign in</a>
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
          <button className="w-full rounded-md p-2 bg-primary text-white hover:text-primary hover:bg-primary-hover_light" >Continue with Email</button>
      </div>
      </div>
    </div>
  );
};

export default Login;
