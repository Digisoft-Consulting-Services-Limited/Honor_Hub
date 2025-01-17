// Navbar.tsx

const Memorial_Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-black via-brown-900 to-black text-white py-4 px-6 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/path/to/logo.png"
          alt="Logo"
          className="w-8 h-8 object-cover"
        />
        <span className="text-lg tracking-wide">HonorHub</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-6 text-sm font-medium">
        <li className="hover:text-gray-400 cursor-pointer">Hello, Salome ▼</li>
        <li className="hover:text-gray-400 cursor-pointer">
          Create a New Website
        </li>
        <li className="hover:text-gray-400 cursor-pointer">Invite Others</li>
        <li className="hover:text-gray-400 cursor-pointer">Contact Support</li>
      </ul>
    </nav>
  );
};

export default Memorial_Navbar;
