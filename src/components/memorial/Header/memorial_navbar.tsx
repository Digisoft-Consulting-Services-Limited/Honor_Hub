import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket,faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface AccountImageProps {
  name: string;
  imageUrl: string;
}
const NavbarSidebar: React.FC <AccountImageProps>= ({name,imageUrl}) => {
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
      <nav className="bg-primary text-primary-light flex items-center justify-between px-4 py-3 shadow-md">
  {/* Logo */}
  <h1 className="text-xl  pl-9 font-bold">HonorHub</h1>

  {/* Hamburger button for mobile */}
  <button
    className="flex flex-col gap-1.5 md:hidden"
    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
  >
    <span className="w-6 h-1 bg-white rounded-sm"></span>
    <span className="w-6 h-1 bg-white rounded-sm"></span>
    <span className="w-6 h-1 bg-white rounded-sm"></span>
  </button>

  {/* Right-aligned navigation links */}
  <div className="hidden md:flex items-center gap-6 pr-6"> {/* Hidden on mobile */}
    <ul className="flex space-x-6">
      <li className="hover:text-gray-300 hover:underline hover:decoration-primary-light_yellow cursor-pointer">Create a New Website</li>
      <li className="hover:text-gray-300 hover:underline hover:decoration-primary-light_yellow cursor-pointer">Invite Others</li>
      <li className="hover:text-gray-300 hover:underline hover:decoration-primary-light_yellow cursor-pointer">Contact Support</li>
    </ul>

    {/* Dropdown for Hello, Salome */}
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 focus:outline-none transition pr-2hover:underline hover:decoration-primary-light_yellow cursor-pointer"
        >
          <FontAwesomeIcon className="" icon={faAngleDown} />
          <span className="hover:underline hover:decoration-primary-light_yellow">Hello, Salome</span>
        </button>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-primary-light_yellow text-black rounded shadow-lg z-50">
          <ul className="py-1 text-sm">
            <li className="px-4 py-2 hover:bg-primary-hover_light cursor-pointer">
              My Memorials
            </li>
            <li className="px-4 py-2 hover:bg-primary-hover_light cursor-pointer">
              Visited Memorials
            </li>
            <li className="px-4 py-2 hover:bg-primary-hover_light cursor-pointer">
              Account Information
            </li>
            <li className="px-4 py-2 hover:bg-primary-hover_light cursor-pointer border-t">
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  </div>
</nav>




      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-primary-light_yellow text-primary shadow-md transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
      >
        <div className="p-4 bg-primary flex items-center space-x-4">
          <div>
          <img
        src={imageUrl}
        alt={`${name}'s Profile`}
        className=" object-cover rounded-full"
        />
          </div>
          <div className="text-primary-light">

          <h3 className="text-lg font-semibold">Salome Githinji</h3>
          <p className="text-sm">sallygithinji72@gmail.com</p>
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
          <ul className="space-y-4">
            <li className="hover:bg-primary-hover_light  p-2 rounded cursor-pointer">
              My Memorials
            </li>
            <li className="hover:bg-primary-hover_light p-2 rounded cursor-pointer">
              Visited Memorials
            </li>
            <li className="hover:bg-primary-hover_light p-2 rounded cursor-pointer">
              Create a New Website
            </li>
            <li className="hover:bg-primary-hover_light p-2 rounded cursor-pointer">
              Share with a Friend
            </li>
            <li className="hover:bg-primary-hover_light p-2 rounded cursor-pointer">
              Contact Support
            </li>
          </ul>
          <div className="border-t border-[#704f3a] mt-4 pt-4">
            <h4 className="text-md font-bold mb-2">My Account</h4>
            <ul>
              <li className="hover:bg-primary-hover_light p-2 rounded cursor-pointer">
                Account Information
              </li>
            </ul>
          </div>
          <div className="border-t border-[#704f3a] mt-4 pt-4">
            <h4 className="text-md font-bold mb-2">Learn More</h4>
            <ul className="space-y-4">
              <li className="hover:bg-primary-hover_light p-2 rounded cursor-pointer">
                About HonorHub Memorials
              </li>
              <li className="hover:bg-primary-hover_light p-2 rounded cursor-pointer">
                Plans & Features
              </li>
              <li className="hover:bg-primary-hover_light p-2 rounded cursor-pointer">
                Testimonials
              </li>
            </ul>
          </div>
          <div className="border-t border-[#704f3a] mt-4 pt-4">
            <ul>
              <li className="hover:bg-primary-hover_light p-2 cursor-pointer">
                Terms of Use
              </li>
              <li className="hover:bg-primary-hover_light p-2 cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>
          <div className="border-t border-[#704f3a] mt-4 pt-4">
            <li className="hover:bg-primary-hover_light p-2 cursor-pointer">
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

