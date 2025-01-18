import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";


const NavbarSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-[#402a1d] text-white flex justify-between items-center px-4 py-3 shadow-md">
        <h1 className="text-xl font-bold">HonorHub</h1>
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="w-6 h-1 bg-white rounded-sm"></span>
          <span className="w-6 h-1 bg-white rounded-sm"></span>
          <span className="w-6 h-1 bg-white rounded-sm"></span>
        </button>
          {/* Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <span>Hello, Salome</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <ul className="py-1 text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Memorials
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Visited Memorials
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Account Information
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-t">
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-gray-300 cursor-pointer">Create a New Website</li>
          <li className="hover:text-gray-300 cursor-pointer">Invite Others</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact Support</li>
        </ul>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-[#402a1d] text-white shadow-md transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
      >
        <div className="p-4 bg-[#5b3926]">
          <h3 className="text-lg font-semibold">Salome Githinji</h3>
          <p className="text-sm">sallygithinji72@gmail.com</p>
        </div>
        {/* Scrollable Content */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
          <ul className="space-y-4">
            <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
              My Memorials
            </li>
            <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
              Visited Memorials
            </li>
            <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
              Create a New Website
            </li>
            <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
              Share with a Friend
            </li>
            <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
              Contact Support
            </li>
          </ul>
          <div className="border-t border-[#704f3a] mt-4 pt-4">
            <h4 className="text-md font-bold mb-2">My Account</h4>
            <ul>
              <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
                Account Information
              </li>
            </ul>
          </div>
          <div className="border-t border-[#704f3a] mt-4 pt-4">
            <h4 className="text-md font-bold mb-2">Learn More</h4>
            <ul className="space-y-4">
              <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
                About HonorHub Memorials
              </li>
              <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
                Plans & Features
              </li>
              <li className="hover:bg-[#604432] p-2 rounded cursor-pointer">
                Testimonials
              </li>
            </ul>
          </div>
          <div className="border-t border-[#704f3a] mt-4 pt-4">
            <ul>
              <li className="hover:text-[#f0b87a] p-2 cursor-pointer">
                Terms of Use
              </li>
              <li className="hover:text-[#f0b87a] p-2 cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>
          <div className="border-t border-[#704f3a] mt-4 pt-4">
            <li className="hover:text-[#f0b87a] p-2 cursor-pointer">
              <FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out 
            </li>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default NavbarSidebar;
