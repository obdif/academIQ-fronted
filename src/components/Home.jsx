import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Brain, Search, ArrowRight, Menu } from 'lucide-react';
import SideBar from './SideBar';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuery, setSubmittedQuery] = useState('');
  

  
  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);



  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setSubmittedQuery(searchQuery);

      try {
        const response = await fetch('https://academiq-backend.onrender.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ query: searchQuery }),
          body: JSON.stringify({ topic: searchQuery }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data from the backend');
        }

      
        const data = await response.json();
        setResponseData(data);
        setSearchHistory((prev) => {
          const newHistory = [searchQuery, ...prev.filter((item) => item !== searchQuery)];
          return newHistory.slice(0, 10);
        });

        setSearchQuery('');
      } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('Failed to fetch')) {
          alert('Network error. Please check your internet connection.');
        } else {
          alert('Server error. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };



  

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };


  const formatTextWithBold = (text) => {
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return { __html: formattedText };
  };


  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')` }}
    >
      {/* Backdrop for mobile history sidebar */}
      {isHistoryOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsHistoryOpen(true)}
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center text-center justify-center z-50">
          <div className="animate-spin rounded-full relative align-center justify-center text-center h-16 w-16 text-white border-b-4 border-white">
          </div>
          <p className=' mt-6 text-white relative ml-4 text-center font-bold text-lg'>Generating...</p>

        </div>
      )}


      {/* Navigation */}
      <nav className="bg-[#0EA8FF] fixed w-full z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white font-sans">AcademIQ</span>
            </div>
            <button
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="text-white hover:text-[#0074C4] focus:outline-none"
              aria-label="Toggle history"
              aria-expanded={isHistoryOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <SideBar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        searchHistory={searchHistory}
        setSearchQuery={setSearchQuery}
        clearHistory={clearHistory}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isHistoryOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        <main className="bg-black/90 backdrop-blur-sm min-h-[calc(100vh-4rem)] p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl mt-16 md:text-6xl font-bold text-white mb-2 font-sans">
                Learn Smarter with AI
              </h1>
              <em className='mb-10 text-white font-sans'>Smart learning for smarter students.</em>


              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mt-12 mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-8 h-5 w-5 text-gray-200" />
                  <input
                    type="text"
                    placeholder="Enter any topic to start learning..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-gray-100 pl-12 pr-4 py-3 h-20 relative flex justify-center align-center rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EA8FF] focus:border-transparent font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-6 bg-[#0EA8FF] text-white px-4 py-1.5 rounded-md hover:bg-[#0EA8FF] transition flex items-center font-sans"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Learn <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>




              {/* Your Prompt Here */}

              {submittedQuery && (
                <div className="relative  right-0 mt-6 mb-8 bg-[#0EA8FF] text-white p-4 rounded-lg shadow-sm w-1/3">
                  <p className="text-lg font-bold">You searched for:</p>
                  <p className="text-md">{submittedQuery}</p>
                </div>
              )}




              {/* Display Backend Response */}
              {responseData && (
                <div className="mt-12 content">
                  {/* Text Content */}
                  <div className="bg-white backdrop-blur-sm p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-2xl font-bold text-[#0EA8FF] text-left mb-3 font-sans">Explanation</h2>
                    <div className='h-0.5 w-full bg-[#0EA8FF] mb-6'></div>
                    <p 
                  className="text-gray-800 whitespace-pre-line text-left font-sans"
                  dangerouslySetInnerHTML={formatTextWithBold(responseData.text_content)}
                />
                    {/* <p className="text-gray-800 whitespace-pre-line text-left font-sans">{responseData.text_content}</p> */}
                  </div>

                  {/* Quiz Questions */}
                  <div className="bg-white backdrop-blur-sm p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-2xl font-bold text-[#0EA8FF] text-left mb-3 font-sans">Quiz</h2>
                  <div className='h-0.5 w-full bg-[#0EA8FF] mb-6'></div>
                    {responseData.quiz_questions.map((question, index) => (
                      <div key={index} className="mb-6">
                        <h3 className="text-lg font-semibold text-left text-gray-900 mb-2 font-sans">{question.question}</h3>
                        <div className="space-y-2">
                          {question.options.map((option, idx) => (
                            <div key={idx} className="flex items-center">
                              <input
                                type="radio"
                                name={`question-${index}`}
                                id={`option-${index}-${idx}`}
                                className="mr-2"
                              />
                              <label htmlFor={`option-${index}-${idx}`} className="text-gray-700 font-sans">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 mb-8 font-sans">Hint: {question.hint}</p>
                      </div>
                    ))}
                  </div>

                  {/* Image */}
                  {responseData.image_url && (
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm mb-8">
                      <h2 className="text-2xl font-bold text-[#0EA8FF] text-left mb-3 font-sans">Visual Guide</h2>
                      <div className='h-0.5 w-full bg-[#0EA8FF] mb-6'></div>
                      <img
                        src={responseData.image_url}
                        alt={responseData.image_description}
                        className="w-full rounded-lg"
                        loading="lazy"
                      />

                      <p className="text-sm text-gray-500 mt-2 font-sans">{responseData.image_description}</p>
                    </div>
                  )}
                </div>
              )}





              {/*  ======== BRIFE PROMPT EXAMPLES ============= */}
              <div className="max-w-2xl mx-auto mb-16">


                {/* Quick Search Suggestions */}
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4 font-sans">Quick Search Suggestions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setSearchQuery("How can I improve my public speaking skills?")}
                      className="text-left p-3 rounded-lg border-1 border-gray-300 "
                    >
                      <span className="text-sm text-gray-300 cursor-pointer hover:text-gray-100  transition font-medium">How can I improve my public speaking skills?</span>
                    </button>

                    <button
                      onClick={() => setSearchQuery("How does quantum computing work?")}
                      className="text-left p-3 border-1 border-gray-300 rounded-lg    transition"
                    >
                      <span className="text-sm text-gray-300 cursor-pointer hover:text-gray-100  transition font-medium">How does quantum computing work?</span>
                    </button>
                    <button
                      onClick={() => setSearchQuery("What are the benefits of journaling?")}
                      className="text-left p-3 border-1 border-gray-300 rounded-lg "
                    >
                      <span className="text-sm  text-gray-300 cursor-pointer hover:text-gray-100  transition font-medium">What are the benefits of journaling?</span>
                    </button>
                    <button
                      onClick={() => setSearchQuery("How can I avoid procrastination?")}
                      className="text-left p-3 border-1 border-gray-300 rounded-lg "
                    >
                      <span className="text-sm  text-gray-300 cursor-pointer hover:text-gray-100  transition font-medium">How can I avoid procrastination?</span>
                    </button>
                  </div>
                </div>
              </div>


              {/* Features */}

              {/* Features */}


              {/* Credit */}
              <div className="mt-16 text-center text-gray-400 font-sans">
                <p>
                  Made with ❤️ by{' '}
                  <a
                    href="https://adekunleblessing.netlify.app/" className='text-[#0EA8FF]' target='_blank'>Adekunle Blessing</a>
                </p>
              </div>

            </div>
          </div>
        </main>
      </div >
    </div >
  );
}

export default Home;