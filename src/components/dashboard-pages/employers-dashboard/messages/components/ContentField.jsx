import React, { useEffect, useState } from 'react';
import { FaTelegram } from "react-icons/fa";
import useWebSocket from 'react-use-websocket';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';

const ChatBoxContentField = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://api.sentryspot.co.uk/api/employeer/profile", {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const result = await response.json();
        setUserId(result.data.employeer_detail.id);
        console.log(result.data.employeer_detail.id) // Store the user ID
      } catch (error) {
        toast.error(error.message || "Something went wrong while fetching the profile");
      }
    };

    fetchUserProfile();
  }, [token]);

  // Fetch job seekers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.sentryspot.co.uk/api/employeer/job-seekers", {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job seekers");
        }

        const result = await response.json();
        setData(result.data); // Store job seekers data
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchData();
  }, [token]);

  // WebSocket setup
  useEffect(() => {
    const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');
  
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };
  
    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      console.log('Message received:', incomingMessage.message);
  
      // Check if the message belongs to the active chat (by comparing receiver_id or sender_id)
      if (incomingMessage.receiver_id === userId || incomingMessage.sender_id === activeChat) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: incomingMessage.message, 
            time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
            sender: incomingMessage.sender_id, // Use sender_id from incoming message
          },
        ]);
      }
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
  }, [activeChat, userId]);

  
  const sendMessage = () => {
    if (inputValue.trim() === '') return;
  
    const messageData = {
      message: inputValue,
      receiver_id: activeChat,
      sender_id: userId, // Use the user ID from the profile
    };
  
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: inputValue, 
          time: new Date().toLocaleTimeString(),
          sender: userId, // Add your own message to the list of messages
        },
      ]);
      setInputValue(''); // Clear the input after sending the message
    } else {
      console.error('WebSocket is not open');
    }
  };
  

  return (
    <div className="flex h-screen bg-rounded-lg bg-blue-200">
      {/* Sidebar: List of Conversations */}
      <div className="w-1/4 bg-blue-800 text-black border-r overflow-y-scroll rounded-lg">
        <div className="p-3 border-b border-purple-700">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
        </div>
        <div className='bg-white'> 
          {data && data.map((jobSeeker) => {
            const { jobskkers_detail } = jobSeeker;
            return (
              <div
                key={jobskkers_detail.id}
                className="flex items-center cursor-pointer p-3 hover:bg-blue-700 border-b bg-white border-gray-300 mx-2 text-white"
                onClick={() => setActiveChat(jobskkers_detail.id)}
              >
                <img
               src={ "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />  {/*jobskkers_detail.photo || */} 
                <div>
                  <p className="font-medium ">{`${jobskkers_detail.first_name} ${jobskkers_detail.last_name}`}</p>
                 
                </div>
                
              </div>
            );
          })}
        </div>
      </div>

      {/* Main: Active Chat */}
      <div className="flex-1 flex flex-col bg-blue-900 rounded-lg">
        {/* Chat Header */}
        <div className="p-3 border-b border-purple-700 flex items-center">
          {activeChat && data && (
            <>
              <img
                src={"https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"}
                alt="User avatar"
                className="w-12 h-12 rounded-full mr-4"
              />{/*data.find(seeker => seeker.jobskkers_detail.id === activeChat)?.jobskkers_detail.photo ||  */}
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {data.find(seeker => seeker.jobskkers_detail.id === activeChat)?.jobskkers_detail.first_name} {data.find(seeker => seeker.jobskkers_detail.id === activeChat)?.jobskkers_detail.last_name}
                </h2>
              </div>
            </>
          )}
        </div>

        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto p-4 text-white bg-blue-50">
  <div className="flex flex-col space-y-4">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'} space-x-2`}
      >
        {msg.sender !== userId && (
          <img
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
        <div className={`bg-${msg.sender === userId ? 'pink-300 text-white rounded-tr-none ' : 'purple-300 rounded-tl-none'} text-white p-2 px-3  rounded-xl max-w-xs`}>
          <p className="break-words">{msg.content}</p>
        </div>
        <span className="text-xs text-gray-500 self-end">{msg.time}</span>
      </div>
    ))}
  </div>
</div>


        {/* Input Area */}
        <div className="border-t bg-blue-300 p-4 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-white text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-white-600 text-black rounded-full ml-2 hover:bg-blue-700 transition"
            onClick={sendMessage}
          >
            <FaTelegram className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxContentField;
