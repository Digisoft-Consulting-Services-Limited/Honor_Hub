
const Gallery = () => {
  return (
    <div>Gallery</div>
  )
}

export default Gallery

// interface MiddleNavbarProps {
//   activeButton: string;
//   setActiveButton: (button: string) => void;
// }

// const Middle_Navbar: React.FC<MiddleNavbarProps> = ({
//   activeButton,
//   setActiveButton,
// }) => {
//   return (
//     <nav className="bg-primary-hover_light text-primary-light">
//       <div className="flex justify-center space-x-8 py-3">
//         {["PHOTO","VIDEO", "AUDIO"].map((item) => (
//           <button
//             key={item}
//             onClick={() => setActiveButton(item)}
//             className={`p-2 rounded-md font-medium transition-all duration-200 ${
//               activeButton === item
//                 ? "text-primary bg-primary-hover_light"
//                 : "text-white hover:text-primary hover:bg-primary-hover_light hover:scale-105"
//             }`}
//           >
//             {item}
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default Middle_Navbar;
