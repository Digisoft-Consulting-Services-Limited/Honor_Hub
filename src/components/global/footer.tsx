
const Footer = () => {
  return (
    <div>
<footer className="bg-primary text-slate-200">
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
  <div className="text-center sm:text-left">
    <h4 className="text-lg font-semibold mb-3 sm:mb-4">HonorHub</h4>
    <p className="text-xs sm:text-sm">Preserving memories with dignity and care</p>
  </div>
  
  <div className="text-center sm:text-left">
    <h4 className="text-lg font-semibold mb-3 sm:mb-4">Resources</h4>
    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
      <li><a href="#" className="hover:text-black block">FAQ</a></li>
      <li><a href="#" className="hover:text-black block">Support</a></li>
      <li><a href="#" className="hover:text-black block">Contact</a></li>
    </ul>
  </div>

  <div className="text-center sm:text-left">
    <h4 className="text-lg font-semibold mb-3 sm:mb-4">Legal</h4>
    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
      <li><a href="#" className="hover:text-black block">Privacy Policy</a></li>
      <li><a href="#" className="hover:text-black block">Terms of Service</a></li>
    </ul>
  </div>

  <div className="text-center sm:text-left">
    <h4 className="text-lg font-semibold mb-3 sm:mb-4">Social</h4>
    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
      <li><a href="#" className="hover:text-black block">Twitter</a></li>
    </ul>
  </div>
</div>

<div className="border-t border-b border-primary-text_black mt-6 sm:mt-8 p-6 sm:pt-8 text-center text-xs  sm:text-sm">
<p className="text-white-600 text-sm">
  © {new Date().getFullYear()} HonorHub. All rights reserved. Made with ❤️ by{" "}
  <a
    href="mailto:sallygithinji72@gmail.com"
    className="text-blue-400 hover:text-blue-500 hover:underline transition duration-300 text-bold"
  >
    Sally
  </a>
  <a
    href="https://www.digisoftke.com/"
    className="text-blue-400 hover:text-blue-500 hover:underline transition duration-300 text-bold"
  >
    DigiSoft Technologies
  </a>
</p>
</div>
</footer>
    </div>
  )
}

export default Footer
