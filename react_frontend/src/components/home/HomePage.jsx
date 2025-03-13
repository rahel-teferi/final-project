import React from "react";
import books from "/Books.jpg";
import banner from "/banner-bg.png";

const HomePage = () => {
  return (
    <div style={{ height: "90vh" }}>
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "100px",
            padding: "150px 0 ",
            backgroundImage: `url(${banner})`,
          }}
        >
          Welcome to Our Library
        </h1>
        <ul
          style={{
            textAlign: "center",
            padding: "90px 60px",
            fontSize: "35px",
            listStyle: "none",
          }}
        >
          <li>Manage books</li>
          <li>Track users</li>
          <li>Extend return date online with ease</li>
        </ul>
      </div>
    </div>
  );
};
export default HomePage;
// import React from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { BookOpen, Users, Clock } from "lucide-react";
// // import { motion } from "framer-motion";

// const features = [
//   {
//     icon: <div size={40} className="text-primary" />,
//     title: "Effortless Book Management",
//     description: "Easily track and manage all books in the library.",
//   },
//   {
//     icon: <div size={40} className="text-primary" />,
//     title: "User-Friendly Experience",
//     description: "Seamless experience for both admins and members.",
//   },
//   {
//     icon: <div size={40} className="text-primary" />,
//     title: "Online Reservations",
//     description: "Reserve books online and pick them up at your convenience.",
//   },
// ];

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Hero Section */}
//       <div className="text-center py-20 bg-blue-600 text-dark">
//         <h1 className="text-5xl font-bold mb-4">Welcome to Our Library</h1>
//         <p className="text-lg mb-6">
//           Manage books, track users, and reserve online with ease.
//         </p>
//         <div className="flex justify-center">
//           <input placeholder="Search for books..." className="w-1/3 mr-2" />
//           <button variant="secondary">Search</button>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="max-w-6xl mx-auto py-16 grid md:grid-cols-3 gap-8 px-6">
//         {features.map((feature, index) => (
//           <div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.2 }}
//           >
//             <div className="p-6 text-center">
//               <div>
//                 <div className="flex justify-center mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Call to Action */}
//       <div className="text-center py-16 bg-gray-900 text-white">
//         <h2 className="text-3xl font-bold mb-4">Join Our Library Today</h2>
//         <p className="mb-6">
//           Sign up now to start borrowing books and managing your library
//           account.
//         </p>
//         <button variant="primary" className="text-lg px-6 py-3">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// }
