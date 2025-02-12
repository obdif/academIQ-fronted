// import Reactf, {useEffect, useState} from 'react';
// import { History, Clock, X, Menu } from 'lucide-react';

// function Sidebar(){
//       const [isHistoryOpen, setIsHistoryOpen] = useState(false);
//       const [searchHistory, setSearchHistory] = useState([]);
//       const [isLoading, setIsLoading] = useState(false);

//       // Load search history from localStorage on component mount
//       useEffect(() => {
//         const savedHistory = localStorage.getItem('searchHistory');
//         if (savedHistory) {
//           setSearchHistory(JSON.parse(savedHistory));
//         }
//       }, []);

//     return (
//         <div
//             className={` sidebar md:static md:translate-x-0 fixed inset-y-0 left-0 transform ${
//                 isHistoryOpen ? 'translate-x-0' : '-translate-x-full'
//             } w-64 bg-white shadow-lg  transition-transform duration-300 ease-in-out z-20 pt-16 md:pt-0 md:h-[calc(100vh-4rem)] md:mt-16`}
//         >


//         {isHistoryOpen && (
//                 <div
//                 className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
//                 onClick={() => setIsHistoryOpen(false)}
//                 />
//             )}


//             <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center">
//                         <History className="w-5 h-5 mr-2 text-[#0EA8FF]" />
//                         <h2 className="text-lg font-semibold text-gray-900 font-sans">Search History</h2>
//                     </div>
//                     <button
//                         onClick={() => setSearchHistory([])}
//                         className="text-sm text-[#0EA8FF] hover:text-[#E9A240] font-sans"
//                     >
//                         Clear
//                     </button>
//                 </div>
//                 <div className="space-y-3">
//                     {searchHistory.map((query, index) => (
//                         <div
//                             key={index}
//                             className="flex items-center text-gray-600 hover:text-[#0EA8FF] group cursor-pointer p-2 rounded-lg hover:bg-gray-50"
//                             onClick={() => {
//                                 setSearchQuery(query);
//                                 setIsHistoryOpen(false);
//                             }}
//                         >
//                             <Clock className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100" />
//                             <span className="text-sm truncate font-sans">{query}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;



import React from 'react';
import { History, Clock, X } from 'lucide-react';

const SideBar = ({ isOpen, onClose, searchHistory, setSearchQuery }) => {
  return (
    <div
      className={`sideBar fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white/90 backdrop-blur-sm shadow-lg transition-transform duration-300 ease-in-out z-20 pt-16 md:pt-0 md:static md:transform-none md:w-64 md:bg-transparent md:backdrop-blur-none md:shadow-none ${isOpen ? 'md:translate-x-0' : 'md:-translate-x-full'
        }`}
    >
      <div className="p-4 z-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <History className="w-5 h-5 mr-2 text-[#0EA8FF]" />
            <h2 className="text-2xl font-bold text-white-900 text-center font-sans">Search History</h2>
          </div>
          <button
            onClick={onClose}
            className="text-sm text-[#0EA8FF] hover:text-[#008CE3] font-sans md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-3">
          {searchHistory.map((query, index) => (
            <div
              key={index}
              className="flex items-center text-white-600 hover:text-[#0EA8FF] group cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              onClick={() => {
                setSearchQuery(query);
                onClose();
              }}
            >
              <Clock className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100" />
              <span className="text-sm truncate font-sans">{query}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;