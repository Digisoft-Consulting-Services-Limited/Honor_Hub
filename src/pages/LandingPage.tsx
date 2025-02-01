import { HeartIcon,  } from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-#ececec">
      {/* Navigation - Improved mobile responsiveness */}
      <nav className="bg-primary-light_yellow shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-semibold black">HonorHub</h1>
          <div className="w-full sm:w-auto flex justify-center">
            <button className="p-2 border-4 border-primary-hover_light hover:bg-primary-hover_light p-2 sm:p-3 rounded-lg text-sm sm:text-base text-primary-light hover:text-blackt bg-primary w-full sm:w-auto">
            Login
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
      <button className="bg-primary border-4 border-primary-hover_light text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-primary-hover_light hover:text-black transition-colors text-sm sm:text-base">
            Start Memorial
          </button>
    </div>

    {/* Image Stack Section */}
    <div className="flex-1 relative">
      <div className="relative">
        {/* Base Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
          <img 
            src="/../../public/img/yellow image.jpg" 
            alt="Memorial example"
            className="w-full h-full object-cover"
          />
          {/* Overlay Frame for Base */}
          <div className="absolute inset-0  rounded-2xl" />
        </div>

        {/* Overlay Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5/6 transform rotate-1 -mt-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/../../public/img/memorial.png"
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
      <footer className="bg-slate-800 text-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold mb-3 sm:mb-4">HonorHub</h4>
            <p className="text-xs sm:text-sm">Preserving memories with dignity and care</p>
          </div>
          
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-blue-400 block">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400 block">Support</a></li>
              <li><a href="#" className="hover:text-blue-400 block">Contact</a></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-blue-400 block">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-400 block">Terms</a></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold mb-3 sm:mb-4">Social</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-blue-400 block">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-400 block">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
          <p>© 2023 HonorHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}