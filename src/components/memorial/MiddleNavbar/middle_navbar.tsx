
const Middle_Navbar: React.FC = () => {
  return (
    <nav className="bg-[#5a4036] text-white">
      <div className="flex justify-center space-x-8 py-3">
        <a
          href="#about"
          className="text-white font-medium hover:text-yellow-200 focus:text-yellow-300"
        >
          ABOUT
        </a>
        <a
          href="#life"
          className="text-white font-medium hover:text-yellow-200 focus:text-yellow-300"
        >
          LIFE
        </a>
        <a
          href="#gallery"
          className="text-white font-medium hover:text-yellow-200 focus:text-yellow-300"
        >
          GALLERY
        </a>
        <a
          href="#stories"
          className="text-white font-medium hover:text-yellow-200 focus:text-yellow-300"
        >
          STORIES
        </a>
      </div>
    </nav>
  );
};

export default Middle_Navbar;
