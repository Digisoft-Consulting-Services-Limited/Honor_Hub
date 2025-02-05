// import { useNavigate } from "react-router-dom";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import Footer from "@/components/global/footer";
// import { motion } from "framer-motion";

// export default function FAQ() {
//   const navigate = useNavigate();

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Navigation */}
//       <nav className="bg-primary-light_yellow shadow-sm">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
//           <h1 
//             onClick={() => navigate('/')} 
//             className="text-xl sm:text-2xl font-semibold black cursor-pointer hover:opacity-80"
//           >
//             HonorHub
//           </h1>
//           <div className="w-full sm:w-auto flex justify-center">
//             <button
//               onClick={() => navigate('/auth/login')}
//               className="p-2 border-4 border-primary-hover_light hover:bg-primary-hover_light p-2 sm:p-3 rounded-lg text-sm sm:text-base text-primary-light hover:text-black bg-primary w-full sm:w-auto"
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* FAQ Content */}
//       <motion.div 
//         className="max-w-3xl mx-auto px-4 py-12"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        
//         <Accordion type="single" collapsible className="w-full space-y-4">
//           <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm p-2">
//             <AccordionTrigger className="text-lg font-medium">
//               What is HonorHub?
//             </AccordionTrigger>
//             <AccordionContent>
//               HonorHub is a digital memorial platform that allows you to create, share, and preserve memories of your loved ones. It provides a dedicated space for tributes, photos, stories, and virtual gatherings to honor those who have passed.
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm p-2">
//             <AccordionTrigger className="text-lg font-medium">
//               How do I create a memorial?
//             </AccordionTrigger>
//             <AccordionContent>
//               Creating a memorial is simple. Click the "Get Started" button, sign up for an account, and follow the guided process to create a personalized memorial page. You can add photos, write stories, share memories, and invite others to contribute.
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm p-2">
//             <AccordionTrigger className="text-lg font-medium">
//               Who can view and contribute to a memorial?
//             </AccordionTrigger>
//             <AccordionContent>
//               You have full control over your memorial's privacy settings. You can make it public, private, or share it with specific people. Invited contributors can add photos, stories, and condolences with your approval.
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm p-2">
//             <AccordionTrigger className="text-lg font-medium">
//               Is there a cost to create a memorial?
//             </AccordionTrigger>
//             <AccordionContent>
//               HonorHub offers both free and premium options. Basic memorials are free and include essential features. Premium memberships offer additional features like unlimited photo storage, virtual candle lighting, and advanced customization options.
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm p-2">
//             <AccordionTrigger className="text-lg font-medium">
//               Can I include multimedia content?
//             </AccordionTrigger>
//             <AccordionContent>
//               Yes, you can add various types of media to your memorial including photos, videos, audio recordings, and written stories. This helps create a rich, meaningful tribute to your loved one.
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="item-6" className="bg-white rounded-lg shadow-sm p-2">
//             <AccordionTrigger className="text-lg font-medium">
//               How long will the memorial stay online?
//             </AccordionTrigger>
//             <AccordionContent>
//               Free memorials are preserved for one year. Premium memorials are permanent and will remain online indefinitely. You can always upgrade a free memorial to ensure it stays available permanently.
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="item-7" className="bg-white rounded-lg shadow-sm p-2">
//             <AccordionTrigger className="text-lg font-medium">
//               Can I download memorial content?
//             </AccordionTrigger>
//             <AccordionContent>
//               Yes, memorial creators can download all content including photos, stories, and condolences. Premium members have access to additional backup options and can create memorial books or digital archives.
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </motion.div>

//       <Footer />
//     </div>
//   );
// }