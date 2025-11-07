
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
    PaperAirplaneIcon,
    PowerIcon,
    ArrowPathIcon,
    MinusIcon,
    WindowIcon,
    ExclamationTriangleIcon
} from '../components/icons.tsx';
import { Chat } from '@google/genai';
import { gemini, isAiConfigured } from '../api.ts';


interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

const AcademicsPage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const systemInstruction = `You are Hub AI, an AI resource for students of Hampden Charter School of Science. Your goal is to be a helpful, safe, and engaging learning partner.

**Core Directives:**
1.  **Knowledge & Expertise:** Your primary role is to assist with academic subjects. You have deep knowledge in areas like **Literature** (analyzing texts, explaining literary devices, providing book summaries) and **History** (explaining events, figures, and concepts). You can also help with math, science, and other subjects.
2.  **Friendly & Professional Tone:** You should be friendly and approachable, but always maintain a professional and educational tone. Your answers must be clear, simple, and to the point. You can engage in light chitchat (like saying hello), but your main focus should always be on providing helpful academic support. Avoid slang and overly casual language.
3.  **Factual HCSS Information:** You must provide accurate, factual information about HCSS based ONLY on the details provided below. Do not use external knowledge or guess when answering questions about the school.
4.  **Handling Off-Topic Questions:** If a question is significantly outside your academic/HCSS scope (e.g., personal opinions, pop culture, complex personal advice), you should gently redirect by saying: 'That's an interesting question! However, my main purpose is to help with academic subjects. Do you have a question about schoolwork I can help with?'

**Absolute Safety Restrictions (Non-Negotiable):**
*   **ZERO TOLERANCE for Inappropriate Content:** You are strictly forbidden from generating, using, or responding to any curse words, profanity, sexual content, hate speech, violence, or any other inappropriate or unsafe topics.
*   **FIRM REFUSAL:** If a user's request contains any forbidden content or asks for it, you MUST immediately and politely refuse. Respond with: "I cannot process requests that involve inappropriate language or topics. My purpose is to maintain a safe and respectful learning environment for everyone." Do not lecture the user; just state your refusal and purpose.

**Authoritative HCSS Facts (Use ONLY this information):**
*   **Official Website:** The one and only official website is https://hampdencharter.org.
*   **High School:** Hampden Charter School of Science - East (High School). Address: 511 Main Street, Chicopee, MA 01020.
*   **Middle School:** Hampden Charter School of Science - West (Middle School). Address: 20 Johnson Road, West Springfield, MA 01089.

**Error Correction Protocol:**
*   If you make a mistake and a user corrects you, you MUST apologize and accept the correction. Acknowledge the user's correct information and confirm you will use it.
*   Example: 'You are absolutely correct, my apologies. Thank you for the correction. The official website is indeed https://hampdencharter.org. I will ensure my information is accurate moving forward.'
*   If the user asks *why* you were wrong, respond: 'My apologies for the error. As an AI, I'm always learning, and I appreciate you helping me improve. I will strive to provide more accurate information based on my programming.'`;

  const initializeChat = useCallback(() => {
    if (!isAiConfigured || !gemini) {
      setAiError("Hub AI is not available. The feature has not been configured by the administrator.");
      setChat(null);
      setChatHistory([]);
      return;
    }

    try {
      setAiError(null);
      setIsAiLoading(true);
      const chatSession = gemini.chats.create({
          model: 'gemini-2.5-pro',
          config: {
              systemInstruction: systemInstruction,
          },
      });
      setChat(chatSession);
      setChatHistory([{
          role: 'model',
          text: "Hello! I am Hub AI. How can I help you with your studies today?"
      }]);
    } catch (e: any) {
        console.error("Failed to initialize AI Chat:", e);
        setAiError("Could not start the AI chat session. Please check the connection or API key setup.");
        setChat(null);
        setChatHistory([]);
    } finally {
        setIsAiLoading(false);
    }
  }, []);
  
  // Initialize Chat on component mount
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);


  // Effect to scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isAiLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isAiLoading || !chat) return;

    const newUserMessage: ChatMessage = { role: 'user', text: userInput };
    setChatHistory(prev => [...prev, newUserMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsAiLoading(true);
    setAiError(null);

    try {
        const result = await chat.sendMessage({ message: currentInput });
        const modelResponse: ChatMessage = { role: 'model', text: result.text };
        setChatHistory(prev => [...prev, modelResponse]);
    } catch (e: any) {
        console.error("Error sending message:", e);
        const errorMessage: ChatMessage = { role: 'model', text: "I'm having a little trouble connecting right now. Please check your internet connection and try again in a moment." };
        setChatHistory(prev => [...prev, errorMessage]);
        setAiError("Failed to get a response from the AI.");
    } finally {
        setIsAiLoading(false);
    }
  };

  const handleNewChat = () => {
    setChat(null);
    setChatHistory([]);
    initializeChat();
  }

  const handleEndChat = () => {
    setChat(null);
    setChatHistory([]);
  }
  
  const handleMinimizeToggle = () => {
      setIsMinimized(!isMinimized);
  }

  const renderContent = () => {
    if (!isAiConfigured) {
        return (
             <div className="flex-grow flex flex-col items-center justify-center p-6 text-center bg-yellow-50/50 rounded-b-lg">
                <ExclamationTriangleIcon className="h-10 w-10 text-yellow-500 mb-4" />
                <h4 className="font-bold text-yellow-800">Feature Not Available</h4>
                <p className="text-yellow-700 text-sm">
                    Hub AI has not been configured by the administrator. An API key is required.
                </p>
             </div>
        );
    }
    
    if (aiError && chatHistory.length === 0) {
      return (
        <div className="flex-grow flex items-center justify-center p-4 text-center">
            <p className="text-red-500">{aiError}</p>
        </div>
      );
    }
    
    if (!chat) {
      return (
          <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
              <p className="mb-4 text-gray-600">Chat session ended.</p>
              <button 
                  onClick={initializeChat}
                  className="px-4 py-2 bg-brand-navy text-white font-semibold rounded-lg shadow-md hover:bg-brand-navy-light transition-colors"
              >
                  Start New Chat
              </button>
        </div>
      );
    }

    return (
        <>
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2.5 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-gradient-to-br from-brand-navy to-blue-800 text-white' : 'bg-slate-200 text-gray-800'}`}>
                           <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isAiLoading && chatHistory.length > 0 && (
                    <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl bg-slate-200 text-gray-800">
                        <div className="flex items-center space-x-1">
                                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex-shrink-0 flex items-center space-x-2 p-3 border-t border-gray-200">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask an academic question..."
                    className="w-full bg-slate-100 text-gray-800 rounded-full py-2.5 px-4 border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-colors"
                    disabled={isAiLoading || !chat}
                />
                <button
                    type="submit"
                    className="bg-brand-navy text-white p-3 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-opacity-90 transition-colors flex-shrink-0"
                    disabled={isAiLoading || !userInput.trim() || !chat}
                    aria-label="Send message"
                >
                    <PaperAirplaneIcon className="h-5 w-5"/>
                </button>
            </form>
        </>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-brand-navy mb-2">HCSS Hub AI</h2>
      <p className="text-gray-600 mb-8">Your personal academic assistant. Ask questions and get help with your studies.</p>

      <div className="bg-white rounded-xl shadow-xl w-full flex flex-col text-gray-800 transition-all duration-300 ease-in-out text-left border border-gray-200/80">
        {/* Chat Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-gray-200">
          <h3 className="text-lg font-bold text-brand-navy">Hub AI</h3>
          <div className="flex items-center space-x-1">
             <button onClick={handleMinimizeToggle} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors disabled:text-gray-300 disabled:hover:bg-transparent" title={isMinimized ? "Maximize" : "Minimize"} disabled={!isAiConfigured}>
                {isMinimized ? <WindowIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
            </button>
            <button onClick={handleNewChat} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors disabled:text-gray-300 disabled:hover:bg-transparent" title="New Chat" disabled={!isAiConfigured}>
                <ArrowPathIcon className="h-5 w-5" />
            </button>
            <button onClick={handleEndChat} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:text-red-200 disabled:hover:bg-transparent" title="End Chat" disabled={!isAiConfigured}>
                <PowerIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className={`flex-1 flex flex-col min-h-0 overflow-hidden transition-all duration-300 ease-in-out ${isMinimized ? 'max-h-0' : 'max-h-[65vh]'}`}>
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AcademicsPage;
