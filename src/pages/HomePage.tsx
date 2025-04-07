import { motion } from "framer-motion";
import Footer from "@/components/global/footer";
import Homepage_Navbar from "@/components/home/homepage_navbar";
import { useNavigate } from "react-router-dom";
import { useMemorial, Honoree } from '@/context/memorial/MemorialContext';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { memorials, isLoading } = useMemorial(); // Get memorials from context
  const handleMemorialClick = (memorial:Honoree) => {
    navigate(`/memorial/${memorial.slug}`,{ 
      state: { slug: memorial.slug ,
        honoreeId: memorial.honoreeId

      }
    }); // Navigate to the memorial page
  };


  return (
    <div className="min-h-screen bg-primary-light">
      <Homepage_Navbar name="Guest" imageUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAALVBMVEXQ0NCxsbG0tLTPz8/Hx8e3t7fAwMDMzMy9vb21tbW6urrBwcGurq7FxcXT09M4BFhyAAAE60lEQVR4nO2dW5OjIBCFVUSNEv7/z92YzQVjVIRmOKTO97IPUzXl2Ya+QNNTVYQQQgghhBBCCCGEEEIIIYQQQgghhBCSBDuT+yNSYfvrMF60voxD16rfk9kOTW3qN2Of+4tE6Qfjqrtj6jb3Z4nR6k91Lzv+wlq1alyZ781UvkQ17Oi7LVWd+wMjsdc9eXcuRXuc3QX6kqhyf2Ywtj+Wd6dUiXZ/BzroMiV6rdAHo6rK86l9461vptFDW5RK2/ob0DFlQW71GiJwjo6lJHJTmMBZYxF2tOECZ1r47RgpsDZDbgVHRAqcJUJb0U6R+tAl2i7WgneJ19w6toleog9QPWpYoP9Gk1vKBq2Qvts67XJr+YpvteQlEbLeEBRY14hG3DpRC+OSW84a74LXD8CIcR1FFdaAYd/2ohoBl2l1urLfBzPqWzl3A7gR7whKRIwXM3JhH7VOtIOUwjG3lC3EjAir0Er5U1iFlVRURN2HtyqYCj2ZcgvZREihwcxpZqRs+PMKgW/4j+/uvUBN2m50MgpxF6lQPARepDIKDfJNokjq3eCdYbyR2IfQJhSJFrhZ94xEtIA88X4TfXCKvUZvBWKsMzVXZDdTqU7HlsAdtMDqEn+4rzvgfKbqZW4vgDei0C0wcHEodc+Ne4QhpVDjehsZgcgKhc4SgRUGNl5+AlzhyxzqI+dtMtdrqB1DdyRKC9Tb0QcCCrGrp+jSoobsw1gQrxA3Z/tPdAsmcDB8ECsR3YTV/Gp0/SrWE2Ma4FjoEhj5p74AAz4IO8vADoQLwhoWkLO1FWFhsZw1GlgLN9DJzCchCnEPL74QVGSUtA2DDhbxk5klp30N8Bnid9RZheglxZqT7hSzs3uXk48tS1ujM6eq4bL86JMTHcNlCpyfXP64QO+4X54bfeIbMZBboPbx9qZFpdwu3p4GtyP4AO83e0VVFQt8K4zCwr1V7yklXvqeFxW2A75Wc5hHmL1vjzys+Jqi0Jcxiq+de2rMq+/neM6CeTXqzfmB0eCj+Npnz9BrZ9m22df4+s9QT8W4Gq1ycm0nxO3lbs1rIo2TAA2gGvtFcFhc5G5pbJx8zV3OZsDbj7b/DO+LVEy1w+diNbU7GMp+NDmgTY2yrV5vtuXxp1X9NOra/KcZh9ZdinY9VcM0Hc5i3XImX6c+9e06vm95XAhDWrVaf8528kypN0OKye51bHuQXXsY4Sie6GvGycqbI3TfXA4GlNneI+3JZEjV1T61gzHdzlrtv7iob78kw91wf2K8Za2nfj360Vbt5N82bS5/q/FgQvAXmrG7OVH74OZRp20PtaFR/+FEvoi3P3oc7xsvqJmh+aNCUuiNYQjmL847lJ9vSCUx/VReuaFlgaQ+ehR6UhFF0s0oNlcvhpRWPH3tmYSU4zFlp7IFk661SGR6pwTJOm9yC3uTKCxmjPSfJDJiblkuSdoYgUyYpnVDSY7UiyZFf1H2dG1JgkscsVFsMsh3wWEt0hTLFCHldpHPa4SGB8khvhGFh8zGMwpvRJtb0BpZgXDbsBYvhOG2obhCqUlzckg7UzhHI518i80lFUQ2XGAc0CyRVSj5lw+kkM1MIU4RP6DCc0DV9w+o8BSC4+TlED2q+X2FlW7wEL5JVM4/u7/53A9VxA9hWsIIIYQQQgghhBBCCCGEEEIIIYQQQgghOPwDhx9CCdDcDFsAAAAASUVORK5CYII=" />

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
              onClick={() => navigate("/memorial/create")}
            >
              Create Memorial
            </motion.button>
          </motion.div>
        </div>
      </div>



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
          { isLoading ? (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <motion.div
      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
    <p className="text-primary text-lg font-medium">Loading Memorials...</p>
  </div>       ):(
        memorials?.map((memorial) => (
            
          <div
            key={memorial.slug}
            className="group bg-gradient-to-br from-primary/40 to-primary/40 rounded-2xl overflow-hidden backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            onClick={() => handleMemorialClick(memorial)} // Navigate on click

          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={memorial.profilePicture } 
                alt={memorial.fullName} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-white">{memorial.fullName}</h3>
              <p className="text-primary-light mb-2 font-medium">{memorial.title}</p>

              <div className="text-primary text-sm space-y-1 mb-3">
              <p>
              <span className="font-medium">{memorial.dateOfBirth} - {memorial.dateOfPassing} </span>{" "}
            </p>
          
                </div>
            </div>
          </div>
        ))
       ) }
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
