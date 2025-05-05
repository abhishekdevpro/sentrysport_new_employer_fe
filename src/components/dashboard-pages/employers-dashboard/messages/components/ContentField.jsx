// import React, { useEffect, useState } from 'react';
// import { FaTelegram } from "react-icons/fa";
// import useWebSocket from 'react-use-websocket';
// import { toast } from 'react-toastify';
// import { Constant } from '@/utils/constant/constant';

// const ChatBoxContentField = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [activeChat, setActiveChat] = useState(null);
//   const [data, setData] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch("https://api.sentryspot.co.uk/api/employeer/profile", {
//           headers: {
//             Authorization: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile");
//         }

//         const result = await response.json();
//         setUserId(result.data.employeer_detail.id);
//         console.log(result.data.employeer_detail.id) // Store the user ID
//       } catch (error) {
//         toast.error(error.message || "Something went wrong while fetching the profile");
//       }
//     };

//     fetchUserProfile();
//   }, [token]);

//   // Fetch job seekers
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://api.sentryspot.co.uk/api/employeer/job-seekers", {
//           headers: {
//             Authorization: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch job seekers");
//         }

//         const result = await response.json();
//         setData(result.data); // Store job seekers data
//       } catch (error) {
//         toast.error(error.message || "Something went wrong");
//       }
//     };

//     fetchData();
//   }, [token]);

//   // WebSocket setup
//   useEffect(() => {
//     const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');
  
//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//     };
  
//     ws.onmessage = (event) => {
//       const incomingMessage = JSON.parse(event.data);
//       console.log('Message received:', incomingMessage.message);
  
//       // Check if the message belongs to the active chat (by comparing receiver_id or sender_id)
//       if (incomingMessage.receiver_id === userId || incomingMessage.sender_id === activeChat) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             content: incomingMessage.message, 
//             time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
//             sender: incomingMessage.sender_id, // Use sender_id from incoming message
//           },
//         ]);
//       }
//     };
  
//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };
  
//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };
  
//     setSocket(ws);
  
//     return () => {
//       ws.close();
//     };
//   }, [activeChat, userId]);

  
//   const sendMessage = () => {
//     if (inputValue.trim() === '') return;
  
//     const messageData = {
//       message: inputValue,
//       receiver_id: activeChat,
//       sender_id: userId, // Use the user ID from the profile
//     };
  
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify(messageData));
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           content: inputValue, 
//           time: new Date().toLocaleTimeString(),
//           sender: userId, // Add your own message to the list of messages
//         },
//       ]);
//       setInputValue(''); // Clear the input after sending the message
//     } else {
//       console.error('WebSocket is not open');
//     }
//   };
  

//   return (
//     <div className="flex h-screen bg-rounded-lg bg-blue-200">
//       {/* Sidebar: List of Conversations */}
//       <div className="w-1/4 bg-blue-800 text-black border-r overflow-y-scroll rounded-lg">
//         <div className="p-3 border-b border-purple-700">
//           <h2 className="text-lg font-semibold text-white">Messages</h2>
//         </div>
//         <div className='bg-white'> 
//           {data && data.map((jobSeeker) => {
//             const { jobskkers_detail } = jobSeeker;
//             return (
//               <div
//                 key={jobskkers_detail.id}
//                 className="flex items-center cursor-pointer p-3 hover:bg-blue-700 border-b bg-white border-gray-300 mx-2 text-white"
//                 onClick={() => setActiveChat(jobskkers_detail.id)}
//               >
//                 <img
//                src={ "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"}
//                   alt="User avatar"
//                   className="w-12 h-12 rounded-full mr-4"
//                 />  {/*jobskkers_detail.photo || */} 
//                 <div>
//                   <p className="font-medium ">{`${jobskkers_detail.first_name} ${jobskkers_detail.last_name}`}</p>
                 
//                 </div>
                
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Main: Active Chat */}
//       <div className="flex-1 flex flex-col bg-blue-900 rounded-lg">
//         {/* Chat Header */}
//         <div className="p-3 border-b border-purple-700 flex items-center">
//           {activeChat && data && (
//             <>
//               <img
//                 src={"https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"}
//                 alt="User avatar"
//                 className="w-12 h-12 rounded-full mr-4"
//               />{/*data.find(seeker => seeker.jobskkers_detail.id === activeChat)?.jobskkers_detail.photo ||  */}
//               <div>
//                 <h2 className="text-lg font-semibold text-white">
//                   {data.find(seeker => seeker.jobskkers_detail.id === activeChat)?.jobskkers_detail.first_name} {data.find(seeker => seeker.jobskkers_detail.id === activeChat)?.jobskkers_detail.last_name}
//                 </h2>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Messages Display */}
//         <div className="flex-1 overflow-y-auto p-4 text-white bg-blue-50">
//   <div className="flex flex-col space-y-4">
//     {messages.map((msg, index) => (
//       <div
//         key={index}
//         className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'} space-x-2`}
//       >
//         {msg.sender !== userId && (
//           <img
//             src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
//             alt="User avatar"
//             className="w-8 h-8 rounded-full"
//           />
//         )}
//         <div className={`bg-${msg.sender === userId ? 'pink-300 text-white rounded-tr-none ' : 'purple-300 rounded-tl-none'} text-white p-2 px-3  rounded-xl max-w-xs`}>
//           <p className="break-words">{msg.content}</p>
//         </div>
//         <span className="text-xs text-gray-500 self-end">{msg.time}</span>
//       </div>
//     ))}
//   </div>
// </div>


//         {/* Input Area */}
//         <div className="border-t bg-blue-300 p-4 flex items-center">
//           <input
//             type="text"
//             placeholder="Type a message"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-1 bg-white text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             className="bg-white-600 text-black rounded-full ml-2 hover:bg-blue-700 transition"
//             onClick={sendMessage}
//           >
//             <FaTelegram className="text-3xl" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBoxContentField;

// import React, { useEffect, useState } from 'react';
// import { FaTelegram, FaUserCircle } from "react-icons/fa";
// import ChatboxContactList from './ContactList';
// import SearchBox from './SearchBox';

// const ChatBoxContentField = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [activeChat, setActiveChat] = useState(15);
  

//   useEffect(() => {
//     const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');

//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//     };

//     ws.onmessage = (event) => {
//       const incomingMessage = JSON.parse(event.data);
//       console.log('Message received:', incomingMessage);

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           content: incomingMessage.message,
//           time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
//           sender: incomingMessage.sender || 'John',
//         }
//       ]);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputValue.trim() === '') return;

//     const data = {
//       message: inputValue,
//       receiver_id: activeChat,
//       sender_id: 29 
//     };

//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify(data));
//       console.log('Message sent:', data);
//       setInputValue('');
//     } else {
//       console.error('WebSocket is not open');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex h-screen bg-blue-50">
//       {/* Contacts Sidebar */}
//       <div className="w-80 bg-white border-r border-blue-100 shadow-lg">
//         <div className="search-box-one p-2">
//           <SearchBox />
//         </div>
//         <ChatboxContactList />
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="bg-white p-4 shadow-sm flex items-center border-b border-blue-100">
//           <img
//             src="https://avatar.iran.liara.run/public/boy?username=Ash"
//             alt="User avatar"
//             className="w-12 h-12 rounded-full mr-4"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-blue-800">John Snow</h2>
//             <p className="text-sm text-green-500">Online</p>
//           </div>
//         </div>

//         {/* Messages Display */}
//         <div className="flex-1 overflow-y-auto p-6 bg-blue-50">
//           <div className="space-y-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.sender === 'John' ? 'justify-start' : 'justify-end'}`}
//               >
//                 <div className={`
//                   max-w-xs p-3 rounded-xl 
//                   ${msg.sender === 'John' 
//                     ? 'bg-white text-blue-800 border border-blue-100 rounded-bl-none' 
//                     : 'bg-blue-600 text-white rounded-br-none'}
//                 `}>
//                   <p className="break-words">{msg.content}</p>
//                   <div className={`text-xs text-opacity-70 text-right mt-1 
//                     ${msg.sender === 'John' ? 'text-blue-500' : 'text-blue-200'}
//                   `}>
//                     {msg.time}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Input Area */}
//         <div className="bg-white p-4 border-t border-blue-100">
//           <div className="flex items-center space-x-3">
//             <button className="text-blue-500 hover:text-blue-700">
//               <FaUserCircle size={24} />
//             </button>
//             <input
//               type="text"
//               placeholder="Type a message"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="flex-1 p-2 bg-blue-50 text-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//             <button 
//               onClick={sendMessage}
//               className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
//             >
//               <FaTelegram size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBoxContentField;
// import React, { useEffect, useState } from 'react';
// import { FaTelegram, FaUserCircle } from "react-icons/fa";
// import EnhancedChatboxContactList from './ContactList';
// import SearchBox from './SearchBox';
// import { Constant } from "@/utils/constant/constant";
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const ChatBoxContentField = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [activeUser, setActiveUser] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const {userInfo} = useSelector((state)=>(state.auth))
//   useEffect(() => {
//     // Get current user ID from localStorage or context
//     const userData = JSON.parse(localStorage.getItem(Constant.USER_DATA) || '{}');
//     setCurrentUserId(userData.id || 29); // Default to 29 if not found
    
//     const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');

//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//     };

//     ws.onmessage = (event) => {
//       const incomingMessage = JSON.parse(event.data);
//       console.log('Message received:', incomingMessage);

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           content: incomingMessage.message,
//           time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
//           sender: incomingMessage.sender_id, // Use the actual sender ID
//         }
//       ]);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, []);

//   // When active user changes, fetch their chat history
//   // useEffect(() => {
//   //   if (activeUser && currentUserId) {
//   //     fetchChatHistory(currentUserId, activeUser.jobskkers_detail.id);
//   //   }
//   // }, [activeUser, currentUserId]);

//   // const fetchChatHistory = async (senderId, receiverId) => {
//   //   try {
//   //     const token = localStorage.getItem(Constant.USER_TOKEN);
      
//   //     const response = await axios.get(`https://api.sentryspot.co.uk/api/messages/history`, {
//   //       params: {
//   //         sender_id: senderId,
//   //         receiver_id: receiverId
//   //       },
//   //       headers: {
//   //         'Authorization': `${token}`,
//   //       }
//   //     });
      
//   //     if (response.data && Array.isArray(response.data.data)) {
//   //       // Transform history data to match our format
//   //       const formattedMessages = response.data.data.map(msg => ({
//   //         content: msg.message,
//   //         time: new Date(msg.created_at).toLocaleTimeString(),
//   //         sender: msg.sender_id
//   //       }));
        
//   //       setMessages(formattedMessages);
//   //     }
//   //   } catch (err) {
//   //     console.error('Error fetching chat history:', err);
//   //   }
//   // };

//   const handleSelectUser = (user) => {
//     setActiveUser(user);
//   };

//   const sendMessage = () => {
//     if (inputValue.trim() === '' || !activeUser) return;

//     const data = {
//       message: inputValue,
//       receiver_id: activeUser.jobskkers_detail.id,
//       sender_id: userInfo.id
//     };

//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify(data));
      
//       // Optimistically add message to UI
//       setMessages(prev => [...prev, {
//         content: inputValue,
//         time: new Date().toLocaleTimeString(),
//         sender: activeUser.jobskkers_detail.id
//       }]);
      
//       console.log('Message sent:', data);
//       setInputValue('');
//     } else {
//       console.error('WebSocket is not open');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex h-screen bg-blue-50">
//       {/* Contacts Sidebar */}
//       <div className="w-80 bg-white border-r border-blue-100 shadow-lg">
//         <div className="search-box-one p-2">
//           <SearchBox />
//         </div>
//         <EnhancedChatboxContactList 
//           onSelectUser={handleSelectUser}
//           activeUserId={activeUser?.jobskkers_detail?.id}
//         />
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {activeUser ? (
//           <>
//             {/* Chat Header */}
//             <div className="bg-white p-4 shadow-sm flex items-center border-b border-blue-100">
//               <img
//                 src={activeUser.jobskkers_detail.profileImage || `https://avatar.iran.liara.run/public/boy?username=${activeUser.jobskkers_detail.first_name}`}
//                 alt="User avatar"
//                 className="w-12 h-12 rounded-full mr-4 object-cover"
//               />
//               <div>
//                 <h2 className="text-lg font-semibold text-blue-800">
//                   {activeUser.jobskkers_detail.first_name} {activeUser.jobskkers_detail.last_name || ''}
//                 </h2>
//                 <p className="text-sm text-green-500">Online</p>
//               </div>
//               {activeUser.jobskkers_detail.job_title && (
//                 <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                   {activeUser.jobskkers_detail.job_title}
//                 </span>
//               )}
//             </div>

//             {/* Messages Display */}
//             <div className="flex-1 overflow-y-auto p-6 bg-blue-50 scrollbar-custom">
//               <div className="space-y-4">
//                 {messages.length > 0 ? (
//                   messages.map((msg, index) => (
//                     <div
//                       key={index}
//                       className={`flex ${msg.sender === currentUserId ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div className={`
//                         max-w-xs p-3 rounded-xl shadow-sm
//                         ${msg.sender === currentUserId 
//                           ? 'bg-blue-600 text-white rounded-br-none' 
//                           : 'bg-white text-blue-800 border border-blue-100 rounded-bl-none'}
//                       `}>
//                         <p className="break-words text-white">{msg.content}</p>
//                         <div className={`text-xs text-opacity-70 text-right mt-1 
//                           ${msg.sender === currentUserId ? 'text-blue-200' : 'text-blue-500'}
//                         `}>
//                           {msg.time}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//                     <svg className="w-16 h-16 mb-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
//                     </svg>
//                     <p>No messages yet. Start a conversation!</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Input Area */}
//             <div className="bg-white p-4 border-t border-blue-100">
//               <div className="flex items-center space-x-3">
//                 <button className="text-blue-500 hover:text-blue-700">
//                   <FaUserCircle size={24} />
//                 </button>
//                 <input
//                   type="text"
//                   placeholder="Type a message"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   className="flex-1 p-2 bg-blue-50 text-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//                 <button 
//                   onClick={sendMessage}
//                   className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
//                 >
//                   <FaTelegram size={24} />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           // No active chat
//           <div className="flex-1 flex flex-col items-center justify-center">
//             <div className="text-center p-8 max-w-md">
//               <svg className="w-24 h-24 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
//               </svg>
//               <h3 className="text-xl font-bold text-blue-800 mb-2">Select a conversation</h3>
//               <p className="text-gray-600">Choose a job seeker from the list to start chatting</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatBoxContentField;

import React, { useEffect, useState } from 'react';
import { FaTelegram, FaUserCircle } from "react-icons/fa";
import EnhancedChatboxContactList from './ContactList';
import SearchBox from './SearchBox';
import { Constant } from "@/utils/constant/constant";
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatBoxContentField = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const { userInfo } = useSelector((state) => (state.auth));
  
  useEffect(() => {
    const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      console.log('Message received:', incomingMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: incomingMessage.message,
          time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
          sender: incomingMessage.sender_id,
        }
      ]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleSelectUser = (user) => {
    setActiveUser(user);
  };

  const sendMessage = () => {
    if (inputValue.trim() === '' || !activeUser || !userInfo?.id) return;

    const data = {
      message: inputValue,
      receiver_id: activeUser.jobskkers_detail.id,
      sender_id: userInfo.id
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      
      // Optimistically add message to UI
      setMessages(prev => [...prev, {
        content: inputValue,
        time: new Date().toLocaleTimeString(),
        sender: userInfo.id // Set the sender as current user
      }]);
      
      console.log('Message sent:', data);
      setInputValue('');
    } else {
      console.error('WebSocket is not open');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-blue-100 shadow-lg">
        <div className="search-box-one p-2">
          <SearchBox />
        </div>
        <EnhancedChatboxContactList 
          onSelectUser={handleSelectUser}
          activeUserId={activeUser?.jobskkers_detail?.id}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 shadow-sm flex items-center border-b border-blue-100">
              <img
                src={activeUser.jobskkers_detail.profileImage || `https://avatar.iran.liara.run/public/boy?username=${activeUser.jobskkers_detail.first_name}`}
                alt="User avatar"
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-blue-800">
                  {activeUser.jobskkers_detail.first_name} {activeUser.jobskkers_detail.last_name || ''}
                </h2>
                <p className="text-sm text-green-500">Online</p>
              </div>
              {activeUser.jobskkers_detail.job_title && (
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {activeUser.jobskkers_detail.job_title}
                </span>
              )}
            </div>

            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto p-6 bg-blue-50 scrollbar-custom">
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === userInfo?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`
                        max-w-xs p-3 rounded-xl shadow-sm
                        ${msg.sender === userInfo?.id 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-white text-blue-800 border border-blue-100 rounded-bl-none'}
                      `}>
                        <p className={`break-words ${msg.sender === userInfo?.id ? 'text-white' : 'text-blue-800'}`}>
                          {msg.content}
                        </p>
                        <div className={`text-xs text-opacity-70 text-right mt-1 
                          ${msg.sender === userInfo?.id ? 'text-blue-200' : 'text-blue-500'}
                        `}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <p>No messages yet. Start a conversation!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-blue-100">
              <div className="flex items-center space-x-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaUserCircle size={24} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-2 bg-blue-50 text-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button 
                  onClick={sendMessage}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <FaTelegram size={24} />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No active chat
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <svg className="w-24 h-24 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a job seeker from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBoxContentField;