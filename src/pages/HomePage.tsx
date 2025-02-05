import { motion } from "framer-motion";
import Footer from "@/components/global/footer";
import Homepage_Navbar from "@/components/home/homepage_navbar";

const HomePage: React.FC = () => {
  const recentMemorials = [
    {
      id: 1,
      name: "Juhudi Khánisi Lugo",
      years: "1990 - 2024",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      description: "A beloved friend and family member who touched many lives."
    },
    {
      id: 2,
      name: "Teresa Shiku",
      years: "1985 - 2023",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      description: "A kind soul who will always be remembered for her generosity."
    },
    {
      id: 3,
      name: "John Doe",
      years: "1975 - 2022",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      description: "A visionary leader who inspired many."
    }
  ];

  return (
    <div className="min-h-screen bg-primary-light">
      <Homepage_Navbar
        name='sally'
        imageUrl='https://via.placeholder.com/150'
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-32 bg-[url('/img/casket.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary/50 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent text-white">
              Honor and Remember
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Create and share memorials for your loved ones. Celebrate their lives and keep their memories alive forever.
            </p>
            <motion.button
                initial="hidden"
                animate="visible"
                className="bg-primary border-4 border-primary-hover_light text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md hover:bg-primary-hover_light hover:text-black transition-colors text-sm sm:text-base"
               
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Memorial
              </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 text-primary"
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Create Memorials",
              description: "Easily create beautiful memorial pages for your loved ones.",
              icon: "🌟"
            },
            {
              title: "Share Memories",
              description: "Invite friends and family to share stories .",
              icon: "💝"
            },
            {
              title: "Forever Accessible",
              description: "Keep memories alive with a permanent online presence.",
              icon: "✨"
            }
          ].map((feature, index) => (
            <div
              key={index}
            
              className="bg-gradient-to-br from-primary/50 to-primary/50 p-8 rounded-2xl backdrop-blur-sm border border-[#5b3926]/10 hover:border-[#5b3926]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#5b3926]/10>"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">{feature.title}</h3>
              <p className="text-primary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Memorials Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 text-primary"
        >
          Recent Online Memorials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentMemorials.map((memorial) => (
            <div
              key={memorial.id}
           
              className="group bg-gradient-to-br from-primary/40 to-primary/40 rounded-2xl overflow-hidden backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={memorial.image} 
                  alt={memorial.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-white">{memorial.name}</h3>
                <p className="text-primary mb-3">{memorial.years}</p>
                <p className="text-primary">{memorial.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;