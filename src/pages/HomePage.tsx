import { Memorial_Navbar } from "../components/Memorial";
const HomePage: React.FC = () => {
  const recentMemorials = [
    {
      id: 1,
      name: "Juhudi Khánisi Lugo",
      years: "1990 - 2024",
      image: "https://via.placeholder.com/150",
      description: "A beloved friend and family member who touched many lives."
    },
    {
      id: 2,
      name: "Teresa Shiku",
      years: "1985 - 2023",
      image: "https://via.placeholder.com/150",
      description: "A kind soul who will always be remembered for her generosity."
    },
    {
      id: 3,
      name: "John Doe",
      years: "1975 - 2022",
      image: "https://via.placeholder.com/150",
      description: "A visionary leader who inspired many."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      <Memorial_Navbar 
        name='sally'
        image='https://via.placeholder.com/150'
      />
      {/* Hero Section */}
      <div className="bg-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Honor and Remember</h1>
          <p className="text-xl mb-8">Create and share memorials for your loved ones. Celebrate their lives and keep their memories alive.</p>
          <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Create Memorials</h3>
            <p className="text-gray-300">Easily create beautiful memorial pages for your loved ones.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Share Memories</h3>
            <p className="text-gray-300">Invite friends and family to share stories and photos.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Forever Accessible</h3>
            <p className="text-gray-300">Keep memories alive with a permanent online presence.</p>
          </div>
        </div>
      </div>

      {/* Recent Memorials Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Recent Memorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentMemorials.map(memorial => (
            <div key={memorial.id} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <img src={memorial.image} alt={memorial.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
              <h3 className="text-xl font-semibold mb-2">{memorial.name}</h3>
              <p className="text-gray-300 mb-2">{memorial.years}</p>
              <p className="text-gray-300">{memorial.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">&copy; 2025 Memorial App. All rights reserved.</p>
          <p className="text-gray-300">Contact us at <a href="mailto:info@memorialapp.com" className="text-blue-500">info@memorialapp.com</a></p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;