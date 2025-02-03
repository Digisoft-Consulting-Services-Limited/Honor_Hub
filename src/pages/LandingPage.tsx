import { HeartIcon,  } from "@heroicons/react/24/outline";
import Footer from "@/components/global/footer";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="bg-#ececec">
      {/* Navigation - Improved mobile responsiveness */}
      <nav className="bg-primary-light_yellow shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-semibold black">HonorHub</h1>
          <div className="w-full sm:w-auto flex justify-center">
            <button onClick={() =>{
              navigate('/login')
            }} className="p-2 border-4 border-primary-hover_light hover:bg-primary-hover_light p-2 sm:p-3 rounded-lg text-sm sm:text-base text-primary-light hover:text-black bg-primary w-full sm:w-auto">
            Get Started
            </button>
          </div>
        </div>
      </nav>


      {/* Hero Section - Adjusted padding and text sizes */}
      <section className="py-16 bg-slate-50">
      {/* Text Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
  <div className="flex flex-col md:flex-row items-center gap-8">
    {/* Text Section */}
    <div className="flex-1 text-center md:text-left">
      <h2 className="text-5xl font-semibold text-black mb-6">
        View and Share Memorials
      </h2>
      
      <p className="text-xl text-black max-w-2xl m-3 mx-auto md:mx-0">
        Post tributes and hymns for your loved ones in a dedicated space that 
        preserves memories with dignity and love.
      </p>
      <button className="bg-primary border-4 border-primary-hover_light text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-primary-hover_light hover:text-black transition-colors text-sm sm:text-base " onClick={() =>{
        navigate('/home')
      }}>
            View Memorials
          </button>
    </div>

    {/* Image Stack Section */}
    <div className="flex-1 relative p-6">
      <div className="relative ">
        {/* Base Image */}
        <div className="relative  rounded-xl overflow-hidden shadow-2xl">
          <img 
            src="/img/sun.jpg" 
            alt="Memorial example"
            className="w-full h-full object-cover"
          />
          {/* Overlay Frame for Base */}
          <div className="absolute inset-0  rounded-2xl" />
        </div>

        {/* Overlay Image */}
        <div className="absolute inset-0 rotate-3 flex items-center justify-center">
          <div className="w-6/7 transform rotate-1 -mt-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/img/memorial.png"
                alt="Candle memorial"
                className="w-full h-full object-cover"
              />
              {/* Overlay Frame for Overlay Image */}
              <div className="absolute inset-0 rounded-2xl" />
              {/* Shadow Effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Decorative Elements */}
     
    </section>

     
      {/* CTA Section - Responsive adjustments */}
      <div className="bg-primary-light_yellow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <HeartIcon className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4 sm:mb-6" />
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
            Preserve Precious Memories
          </h3>
          <p className="text-primary-text_black mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Create a lasting tribute that honors your loved one's life story. Share memories, collect condolences, 
            and keep their legacy alive.
          </p>
         
        </div>
      </div>

      {/* Footer - Responsive grid */}
 <Footer />
    </div>
  );
}