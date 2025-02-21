import React from 'react';
import { History, Clock, X } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideBar = ({ isOpen, onClose, searchHistory, setSearchQuery, clearHistory }) => {


  const handleClearHistory = () => {
    toast.warn('Are you sure you want to clear your history?', {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      onClick: () => {
        const confirmAction = window.confirm('Are you sure you want to clear your history?');
        if (confirmAction) {
          clearHistory(); 
        }
      },
    });
  };

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
            className="text-sm cursor-pointer text-[#0EA8FF] hover:text-[#008CE3] font-sans md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3">
          {searchHistory.length > 0 ? (
            searchHistory.map((query, index) => (
              <div
                key={index}
                className="flex items-center text-gray-100 hover:text-[#0EA8FF] group cursor-pointer p-2 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  setSearchQuery(query);
                  onClose();
                }}
              >
                <Clock className="w-5 h-5 mr-2 opacity-100  group-hover:opacity-100" />
                <span className="text-sm truncate">{query}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No search history available.</p>
          )}
        </div>

        {searchHistory.length > 0 && (
          <button
            onClick={handleClearHistory} 
            className="mt-4 w-full absolute right-0 bottom-0 bg-red-500 text-white cursor-pointer py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Clear History
          </button>
        )}
      

      </div>
    </div>
  );
};

export default SideBar;