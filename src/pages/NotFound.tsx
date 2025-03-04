// src/pages/NotFoundPage.tsx
import Homepage_Navbar from '@/components/home/homepage_navbar';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
   <Homepage_Navbar name="Guest" imageUrl='' />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="mb-8">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_9ByeMp6zF3jId4qx6FInJ2pAd36FBTHSg&s"
              alt="404"
              className="w-96 mx-auto"
            />
          </div>

          <div className="max-w-2xl mx-auto mt-20">
            
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist.
            </p>
            <button
              onClick={goToHome}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover_light transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};