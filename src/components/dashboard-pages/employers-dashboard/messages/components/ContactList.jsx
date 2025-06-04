import { useEffect, useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

// Shared utility for consistent image handling
const getDummyImage = (name) => {
    // Use DiceBear API for consistent dummy images based on name
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
};

const ChatboxContactList = ({ onSelectUser, activeUserId, users }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (userId) => {
        setImageErrors(prev => ({
            ...prev,
            [userId]: true
        }));
    };

    const fetchUserDetails = async (userId) => {
        try {
            const token = localStorage.getItem(Constant.USER_TOKEN);
            const response = await axios.get(`https://api.sentryspot.co.uk/api/employeer/chat-user-list-messages?chat_user_id=${userId}&last_message_id=0`, {
                headers: {
                    'Authorization': `${token}`,
                }
            });
            
            if (response.data.status === "success") {
                // Pass the user data directly since we already have it from the main list
                onSelectUser(users.find(user => user.chat_user_id === userId));
            }
        } catch (err) {
            console.error("Error fetching user details:", err);
            setError(err.response?.data?.message || err.message);
        }
    };

    useEffect(() => {
        if (users && users.length > 0) {
            setLoading(false);
        }
    }, [users]);

    const handleUserClick = (user) => {
        fetchUserDetails(user.chat_user_id);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-2 my-4">
                <p className="font-medium">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="contacts-container h-full">
            <ul className="contacts overflow-y-auto h-full max-h-[calc(100vh-200px)] scrollbar-custom pr-1">
                {users && users.length > 0 ? (
                    users.map((user, index) => {
                        const userId = user.chat_user_id;
                        const isActive = userId === activeUserId;
                        const fullName = `${user.first_name} ${user.last_name}`.trim();
                        const userImage = !imageErrors[userId] && user.photo ? user.photo : getDummyImage(fullName);
                        
                        return (
                            <li 
                                key={userId || index} 
                                className={`hover:bg-gray-100 rounded-lg transition-all duration-200 mb-2 ${isActive ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
                                onClick={() => handleUserClick(user)}
                            >
                                <div className="cursor-pointer">
                                    <div className="flex items-center p-3">
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={userImage}
                                                className="rounded-full h-12 w-12 object-cover border border-gray-200"
                                                alt={`${fullName}'s avatar`}
                                                onError={() => handleImageError(userId)}
                                            />
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                                        </div>
                                        <div className="ml-3 flex-grow">
                                            <div className="font-medium text-gray-900">{fullName || "Unnamed User"}</div>
                                            <p className="text-sm text-gray-500 truncate">{user.email || "No email"}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="py-8">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-center">No contacts found</p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};

// Add this CSS to your global stylesheet or a component-level <style> tag
const ScrollbarStyles = () => (
    <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
            width: 6px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
    `}</style>
);

export { getDummyImage }; // Export the utility function
export default function EnhancedChatboxContactList({ onSelectUser, activeUserId, users }) {
    return (
        <>
            <ScrollbarStyles />
            <ChatboxContactList onSelectUser={onSelectUser} activeUserId={activeUserId} users={users} />
        </>
    );
}