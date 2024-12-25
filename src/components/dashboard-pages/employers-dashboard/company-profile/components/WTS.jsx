// // // // import React, { useState, useEffect } from 'react';
// // // // import { Trash2, Plus } from 'lucide-react';
// // // // import axios from 'axios';
// // // // import { Card, CardContent } from '@/components/ui/card';
// // // // import { Constant } from '@/utils/constant/constant';

// // // // const WatchWhatWeSaySection = () => {
// // // //   const [mediaContents, setMediaContents] = useState([]);
// // // //   const token = localStorage.getItem(Constant.USER_TOKEN)
// // //   const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';

// // // //   useEffect(() => {
// // // //     fetchMediaContents();
// // // //   }, []);

// // // //   const fetchMediaContents = async () => {
// // // //     try {
// // // //       const response = await axios.get(`${baseUrl}/company-wts`,{
// // // //         headers:{
// // // //             Authorization:token
// // // //         }
// // // //       });
// // // //       setMediaContents(response.data);
// // // //     } catch (error) {
// // // //       console.error('Error fetching media contents:', error);
// // // //     }
// // // //   };

// // // //   const handleFileUpload = async (id, file) => {
// // // //     try {
// // // //       const formData = new FormData();
// // // //       formData.append('media_upload', file);

// // // //       await axios.patch(`${baseUrl}/company-wts/${id}`, formData, {
// // // //         headers: {
// // // //           'Content-Type': 'multipart/form-data',
// // // //           Authorization:token
// // // //         },
// // // //       });
      
// // // //       fetchMediaContents();
// // // //     } catch (error) {
// // // //       console.error('Error uploading file:', error);
// // // //     }
// // // //   };

// // // //   const handleAddContent = async () => {
// // // //     try {
// // // //       const newContent = {
// // // //         title: '',
// // // //         description: '',
// // // //         type: 'video',
// // // //       };

// // // //       await axios.post(`${baseUrl}/company-wts`, newContent,{
// // // //         headers:{
// // // //             Authorization:token
// // // //         }
// // // //       });
// // // //       fetchMediaContents();
// // // //     } catch (error) {
// // // //       console.error('Error adding new content:', error);
// // // //     }
// // // //   };

// // // //   const handleRemoveContent = async (id) => {
// // // //     try {
// // // //       await axios.delete(`${baseUrl}/company-wts/${id}`);
// // // //       fetchMediaContents();
// // // //     } catch (error) {
// // // //       console.error('Error removing content:', error);
// // // //     }
// // // //   };

// // // //   const handleUpdateContent = async (id, updatedData) => {
// // // //     try {
// // // //       await axios.patch(`${baseUrl}/company-wts/${id}`, updatedData,{
// // // //         headers:{
// // // //             Authorization:token
// // // //         }
// // // //       });
// // // //       fetchMediaContents();
// // // //     } catch (error) {
// // // //       console.error('Error updating content:', error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Card className="w-full">
// // // //       <CardContent className="p-6">
// // // //         <h2 className="text-2xl font-semibold mb-6">Watch What We Have to Say</h2>
        
// // // //         <div className="space-y-8">
// // // //           {mediaContents.map((content, index) => (
// // // //             <div key={content.id} className="p-6 bg-gray-50 rounded-lg">
// // // //               <div className="flex justify-between items-center mb-4">
// // // //                 <h5 className="text-lg font-medium text-gray-900">
// // // //                   Media Content #{index + 1}
// // // //                 </h5>
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => handleRemoveContent(content.id)}
// // // //                   className="text-red-500 hover:text-red-700"
// // // //                 >
// // // //                   <Trash2 className="w-5 h-5" />
// // // //                 </button>
// // // //               </div>

// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
// // // //                 <div>
// // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                     Title
// // // //                   </label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={content.title}
// // // //                     onChange={(e) => 
// // // //                       handleUpdateContent(content.id, { title: e.target.value })
// // // //                     }
// // // //                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// // // //                   />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                     Media Upload
// // // //                   </label>
// // // //                   <input
// // // //                     type="file"
// // // //                     accept="video/*,image/*"
// // // //                     onChange={(e) => 
// // // //                       handleFileUpload(content.id, e.target.files[0])
// // // //                     }
// // // //                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                   Description
// // // //                 </label>
// // // //                 <textarea
// // // //                   value={content.description}
// // // //                   onChange={(e) => 
// // // //                     handleUpdateContent(content.id, { description: e.target.value })
// // // //                   }
// // // //                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
// // // //                   placeholder="Describe this media content..."
// // // //                 />
// // // //               </div>
// // // //             </div>
// // // //           ))}

// // // //           <button
// // // //             type="button"
// // // //             onClick={handleAddContent}
// // // //             className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
// // // //           >
// // // //             <Plus className="w-5 h-5 mr-2" />
// // // //             Add New Media
// // // //           </button>
// // // //         </div>
// // // //       </CardContent>
// // // //     </Card>
// // // //   );
// // // // };

// // // // export default WatchWhatWeSaySection;

// // // import React, { useState, useEffect } from 'react';
// // // import { Trash2, Plus } from 'lucide-react';
// // // import axios from 'axios';
// // // import { Card, CardContent } from '@/components/ui/card';
// // // import { Constant } from '@/utils/constant/constant';

// // // const WatchWhatWeSaySection = () => {
// // //   const [mediaContents, setMediaContents] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const token = localStorage.getItem(Constant.USER_TOKEN);
// // //   const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';

// // //   useEffect(() => {
// // //     fetchMediaContents();
// // //   }, []);

// // //   const fetchMediaContents = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       const response = await axios.get(`${baseUrl}/company-wts`, {
// // //         headers: {
// // //           Authorization: token
// // //         }
// // //       });
// // //       setMediaContents(response.data || []); // Handle null/undefined response
// // //     } catch (error) {
// // //       console.error('Error fetching media contents:', error);
// // //       setMediaContents([]); // Set empty array on error
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleFileUpload = async (id, file) => {
// // //     try {
// // //       const formData = new FormData();
// // //       formData.append('media_upload', file);

// // //       await axios.patch(`${baseUrl}/company-wts/${id}`, formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data',
// // //           Authorization: token
// // //         },
// // //       });
      
// // //       fetchMediaContents();
// // //     } catch (error) {
// // //       console.error('Error uploading file:', error);
// // //       // You might want to add error handling UI here
// // //     }
// // //   };

// // //   const handleAddContent = async () => {
// // //     try {
// // //       const newContent = {
// // //         title: '',
// // //         description: '',
// // //         type: 'video',
// // //       };

// // //       const response = await axios.post(`${baseUrl}/company-wts`, newContent, {
// // //         headers: {
// // //           Authorization: token
// // //         }
// // //       });

// // //       // Add the new content to the state immediately for better UX
// // //       setMediaContents(prev => [...prev, response.data]);
// // //     } catch (error) {
// // //       console.error('Error adding new content:', error);
// // //       // You might want to add error handling UI here
// // //     }
// // //   };

// // //   const handleRemoveContent = async (id) => {
// // //     try {
// // //       await axios.delete(`${baseUrl}/company-wts/${id}`, {
// // //         headers: {
// // //           Authorization: token
// // //         }
// // //       });
// // //       setMediaContents(prev => prev.filter(content => content.id !== id));
// // //     } catch (error) {
// // //       console.error('Error removing content:', error);
// // //       // You might want to add error handling UI here
// // //     }
// // //   };

// // //   const handleUpdateContent = async (id, updatedData) => {
// // //     try {
// // //       await axios.patch(`${baseUrl}/company-wts/${id}`, updatedData, {
// // //         headers: {
// // //           Authorization: token
// // //         }
// // //       });
      
// // //       // Update the state immediately for better UX
// // //       setMediaContents(prev =>
// // //         prev.map(content =>
// // //           content.id === id ? { ...content, ...updatedData } : content
// // //         )
// // //       );
// // //     } catch (error) {
// // //       console.error('Error updating content:', error);
// // //       // You might want to add error handling UI here
// // //     }
// // //   };

// // //   const MediaForm = ({ content, index, onRemove }) => (
// // //     <div className="p-6 bg-gray-50 rounded-lg">
// // //       <div className="flex justify-between items-center mb-4">
// // //         <h5 className="text-lg font-medium text-gray-900">
// // //           Media Content #{index + 1}
// // //         </h5>
// // //         <button
// // //           type="button"
// // //           onClick={() => onRemove(content.id)}
// // //           className="text-red-500 hover:text-red-700"
// // //         >
// // //           <Trash2 className="w-5 h-5" />
// // //         </button>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
// // //         <div>
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Title
// // //           </label>
// // //           <input
// // //             type="text"
// // //             value={content.title || ''}
// // //             onChange={(e) => 
// // //               handleUpdateContent(content.id, { title: e.target.value })
// // //             }
// // //             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// // //             placeholder="Enter title"
// // //           />
// // //         </div>
// // //         <div>
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             Media Upload
// // //           </label>
// // //           <input
// // //             type="file"
// // //             accept="video/*,image/*"
// // //             onChange={(e) => 
// // //               handleFileUpload(content.id, e.target.files[0])
// // //             }
// // //             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// // //           />
// // //         </div>
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium text-gray-700 mb-2">
// // //           Description
// // //         </label>
// // //         <textarea
// // //           value={content.description || ''}
// // //           onChange={(e) => 
// // //             handleUpdateContent(content.id, { description: e.target.value })
// // //           }
// // //           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
// // //           placeholder="Describe this media content..."
// // //         />
// // //       </div>
// // //     </div>
// // //   );

// // //   if (isLoading) {
// // //     return (
// // //       <Card className="w-full">
// // //         <CardContent className="p-6">
// // //           <div className="animate-pulse space-y-4">
// // //             <div className="h-6 bg-gray-200 rounded w-1/4"></div>
// // //             <div className="h-32 bg-gray-200 rounded"></div>
// // //           </div>
// // //         </CardContent>
// // //       </Card>
// // //     );
// // //   }

// // //   return (
// // //     <Card className="w-full">
// // //       <CardContent className="p-6">
// // //         <h2 className="text-2xl font-semibold mb-6">Watch What We Have to Say</h2>
        
// // //         <div className="space-y-8">
// // //           {/* {mediaContents.map((content, index) => (
// // //             <MediaForm
// // //               key={content.id || index}
// // //               content={content}
// // //               index={index}
// // //               onRemove={handleRemoveContent}
// // //             />
// // //           ))} */}

// // //           <button
// // //             type="button"
// // //             onClick={handleAddContent}
// // //             className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
// // //           >
// // //             <Plus className="w-5 h-5 mr-2" />
// // //             Add New Media
// // //           </button>
// // //         </div>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default WatchWhatWeSaySection;

// // // import React, { useState, useEffect } from 'react';
// // // import { Trash2, Plus, Edit2, Save } from 'lucide-react';
// // // import ReactQuill from 'react-quill';
// // // import { Constant } from '@/utils/constant/constant';

// // // const MediaContentForm = () => {
// // //   const [mediaContents, setMediaContents] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [editMode, setEditMode] = useState({});
// // //   const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';
// // //   const token = localStorage.getItem(Constant.USER_TOKEN)


// // //   // Fetch existing media contents
// // //   const fetchMediaContents = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await fetch(`${baseUrl}/company-wts`,{
// // //         headers: {
// // //             Authorization: ` ${token}`,
// // //           },
// // //       });
// // //       if (!response.ok) throw new Error('Failed to fetch media contents');
// // //       const data = await response.json();
// // //       setMediaContents(data);
// // //     } catch (err) {
// // //       setError(err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchMediaContents();
// // //   }, []);

// // //   // Handle media type change
// // //   const handleMediaTypeChange = (id, type) => {
// // //     setMediaContents(prev =>
// // //       prev.map(content =>
// // //         content.id === id ? { ...content, type } : content
// // //       )
// // //     );
// // //   };

// // //   // Handle media description change
// // //   const handleMediaDescriptionChange = (id, description) => {
// // //     setMediaContents(prev =>
// // //       prev.map(content =>
// // //         content.id === id ? { ...content, description } : content
// // //       )
// // //     );
// // //   };

// // //   // Handle media upload
// // //   const handleMediaUpload = async (id, file) => {
// // //     const formData = new FormData();
// // //     formData.append('media_upload', file);

// // //     try {
// // //       const response = await fetch(`${baseUrl}/company-wts`, {
// // //         method: 'POST',
// // //         headers: {
// // //             Authorization: token, 
// // //           },
// // //         body: formData
// // //       });
// // //       if (!response.ok) throw new Error('Upload failed');
// // //       const { url } = await response.json();
      
// // //       setMediaContents(prev =>
// // //         prev.map(content =>
// // //           content.id === id ? { ...content, mediaUrl: url } : content
// // //         )
// // //       );
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   // Add new media content
// // //   const addMediaContent = () => {
// // //     const newContent = {
// // //       id: `temp-${Date.now()}`,
// // //       type: 'video',
// // //       description: '',
// // //       mediaUrl: null
// // //     };
// // //     setMediaContents(prev => [...prev, newContent]);
// // //     setEditMode(prev => ({ ...prev, [newContent.id]: true }));
// // //   };

// // //   // Save media content
// // //   const handleSave = async (content) => {
// // //     try {
// // //       const method = content.id.startsWith('temp-') ? 'POST' : 'PATCH';
// // //       const url = content.id.startsWith('temp-') 
// // //         ? `${baseUrl}/company-wts`
// // //         : `${baseUrl}/company-teams/${content.id}`;

// // //       const response = await fetch(url, {
// // //         method,
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           type: content.type,
// // //           description: content.description,
// // //           mediaUrl: content.mediaUrl
// // //         })
// // //       });

// // //       if (!response.ok) throw new Error('Failed to save media content');
      
// // //       const savedContent = await response.json();
// // //       setMediaContents(prev =>
// // //         prev.map(item =>
// // //           item.id === content.id ? savedContent : item
// // //         )
// // //       );
// // //       setEditMode(prev => ({ ...prev, [savedContent.id]: false }));
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   // Delete media content
// // //   const handleDelete = async (id) => {
// // //     try {
// // //       if (!id.startsWith('temp-')) {
// // //         const response = await fetch(`${baseUrl}/company-teams/${id}`, {
// // //           method: 'DELETE',
// // //           headers: {
// // //             Authorization: token, 
// // //           },
// // //         });
// // //         if (!response.ok) throw new Error('Failed to delete media content');
// // //       }
// // //       setMediaContents(prev => prev.filter(content => content.id !== id));
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   // Toggle edit mode
// // //   const toggleEdit = (id) => {
// // //     setEditMode(prev => ({ ...prev, [id]: !prev[id] }));
// // //   };

// // //   if (loading) {
// // //     return <div className="text-center p-4">Loading...</div>;
// // //   }

// // //   return (
// // //     <div className="space-y-8">
// // //       <h2 className="text-2xl font-bold">Watch What We Have to Say</h2>

// // //       {error && (
// // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
// // //           <span className="block sm:inline">{error}</span>
// // //         </div>
// // //       )}

// // //       {mediaContents.map((content) => (
// // //         <div key={content.id} className="p-6 bg-gray-50 rounded-lg">
// // //           <div className="flex justify-between items-center mb-4">
// // //             <h5 className="text-lg font-medium text-gray-900">
// // //               Media Content #{content.id}
// // //             </h5>
// // //             <div className="flex gap-2">
// // //               {editMode[content.id] ? (
// // //                 <button
// // //                   onClick={() => handleSave(content)}
// // //                   className="text-green-500 hover:text-green-700"
// // //                 >
// // //                   <Save className="w-5 h-5" />
// // //                 </button>
// // //               ) : (
// // //                 <button
// // //                   onClick={() => toggleEdit(content.id)}
// // //                   className="text-blue-500 hover:text-blue-700"
// // //                 >
// // //                   <Edit2 className="w-5 h-5" />
// // //                 </button>
// // //               )}
// // //               <button
// // //                 onClick={() => handleDelete(content.id)}
// // //                 className="text-red-500 hover:text-red-700"
// // //               >
// // //                 <Trash2 className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Type
// // //               </label>
// // //               <select
// // //                 value={content.type}
// // //                 onChange={(e) => handleMediaTypeChange(content.id, e.target.value)}
// // //                 disabled={!editMode[content.id]}
// // //                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// // //               >
// // //                 <option value="video">Video</option>
// // //                 <option value="image">Image</option>
// // //               </select>
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Upload {content.type === 'video' ? 'Video' : 'Image'}
// // //               </label>
// // //               <input
// // //                 type="file"
// // //                 accept={content.type === 'video' ? 'video/*' : 'image/*'}
// // //                 onChange={(e) => handleMediaUpload(content.id, e.target.files[0])}
// // //                 disabled={!editMode[content.id]}
// // //                 className="w-full p-2 border rounded-lg"
// // //               />
// // //               {content.mediaUrl && (
// // //                 <div className="mt-2">
// // //                   {content.type === 'video' ? (
// // //                     <video src={content.mediaUrl} className="w-full" controls />
// // //                   ) : (
// // //                     <img src={content.mediaUrl} alt="Uploaded content" className="w-full" />
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Description
// // //             </label>
// // //             <ReactQuill
// // //               theme="snow"
// // //               value={content.description || ""}
// // //               onChange={(value) => handleMediaDescriptionChange(content.id, value)}
// // //               readOnly={!editMode[content.id]}
// // //               className="h-36 mb-12"
// // //               placeholder="Describe this media content..."
// // //             />
// // //           </div>
// // //         </div>
// // //       ))}

// // //       <button
// // //         type="button"
// // //         onClick={addMediaContent}
// // //         className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
// // //       >
// // //         <Plus className="w-5 h-5 mr-2" />
// // //         Add New Media
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default MediaContentForm;

// // import React, { useState, useEffect } from 'react';
// // import { Trash2, Plus, Edit2, Save } from 'lucide-react';
// // import ReactQuill from 'react-quill';
// // import { Constant } from '@/utils/constant/constant';

// // const MediaContentForm = () => {
// //   const [mediaContents, setMediaContents] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [editMode, setEditMode] = useState({});
// //   const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';
// //   const token = localStorage.getItem(Constant.USER_TOKEN);

// //   // Fetch existing media contents
// //   const fetchMediaContents = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch(`${baseUrl}/company-wts`, {
// //         headers: {
// //           Authorization: `${token}`,
// //         },
// //       });
// //       if (!response.ok) throw new Error('Failed to fetch media contents');
// //       const data = await response.json();
// //       // Handle null or empty response
// //       setMediaContents(Array.isArray(data) && data.length > 0 ? data : []);
// //     } catch (err) {
// //       setError(err.message);
// //       setMediaContents([]); // Set to empty array in case of error
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMediaContents();
// //   }, []);

// //   // Handle media type change
// //   const handleMediaTypeChange = (id, type) => {
// //     setMediaContents(prev =>
// //       prev.map(content =>
// //         content.id === id ? { ...content, type } : content
// //       )
// //     );
// //   };

// //   // Handle media description change
// //   const handleMediaDescriptionChange = (id, description) => {
// //     setMediaContents(prev =>
// //       prev.map(content =>
// //         content.id === id ? { ...content, description } : content
// //       )
// //     );
// //   };

// //   // Handle media upload
// //   const handleMediaUpload = async (id, file) => {
// //     const formData = new FormData();
// //     formData.append('media_upload', file);

// //     try {
// //       const response = await fetch(`${baseUrl}/company-wts`, {
// //         method: 'POST',
// //         headers: {
// //           Authorization: token,
// //         },
// //         body: formData
// //       });
// //       if (!response.ok) throw new Error('Upload failed');
// //       const { url } = await response.json();
      
// //       setMediaContents(prev =>
// //         prev.map(content =>
// //           content.id === id ? { ...content, mediaUrl: url } : content
// //         )
// //       );
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   // Add new media content
// //   const addMediaContent = () => {
// //     const newContent = {
// //       id: `temp-${Date.now()}`,
// //       type: 'video',
// //       description: '',
// //       mediaUrl: null
// //     };
// //     setMediaContents(prev => [...prev, newContent]);
// //     setEditMode(prev => ({ ...prev, [newContent.id]: true }));
// //   };

// //   // Save media content
// //   const handleSave = async (content) => {
// //     try {
// //       const method = content.id.startsWith('temp-') ? 'POST' : 'PATCH';
// //       const url = content.id.startsWith('temp-') 
// //         ? `${baseUrl}/company-wts`
// //         : `${baseUrl}/company-teams/${content.id}`;

// //       const response = await fetch(url, {
// //         method,
// //         headers: { 
// //           'Content-Type': 'application/json',
// //           Authorization: token,
// //         },
// //         body: JSON.stringify({
// //           type: content.type,
// //           description: content.description,
// //           mediaUrl: content.mediaUrl
// //         })
// //       });

// //       if (!response.ok) throw new Error('Failed to save media content');
      
// //       const savedContent = await response.json();
// //       setMediaContents(prev =>
// //         prev.map(item =>
// //           item.id === content.id ? savedContent : item
// //         )
// //       );
// //       setEditMode(prev => ({ ...prev, [savedContent.id]: false }));
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   // Delete media content
// //   const handleDelete = async (id) => {
// //     try {
// //       if (!id.startsWith('temp-')) {
// //         const response = await fetch(`${baseUrl}/company-teams/${id}`, {
// //           method: 'DELETE',
// //           headers: {
// //             Authorization: token, 
// //           },
// //         });
// //         if (!response.ok) throw new Error('Failed to delete media content');
// //       }
// //       setMediaContents(prev => prev.filter(content => content.id !== id));
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   // Toggle edit mode
// //   const toggleEdit = (id) => {
// //     setEditMode(prev => ({ ...prev, [id]: !prev[id] }));
// //   };

// //   return (
// //     <div className="space-y-8">
// //       <h2 className="text-2xl font-bold">Watch What We Have to Say</h2>

// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
// //           <span className="block sm:inline">{error}</span>
// //         </div>
// //       )}

// //       {loading ? (
// //         <div className="text-center p-4">Loading...</div>
// //       ) : (
// //         <>
// //           {mediaContents.map((content) => (
// //             <div key={content.id} className="p-6 bg-gray-50 rounded-lg">
// //               <div className="flex justify-between items-center mb-4">
// //                 <h5 className="text-lg font-medium text-gray-900">
// //                   Media Content #{content.id}
// //                 </h5>
// //                 <div className="flex gap-2">
// //                   {editMode[content.id] ? (
// //                     <button
// //                       onClick={() => handleSave(content)}
// //                       className="text-green-500 hover:text-green-700"
// //                     >
// //                       <Save className="w-5 h-5" />
// //                     </button>
// //                   ) : (
// //                     <button
// //                       onClick={() => toggleEdit(content.id)}
// //                       className="text-blue-500 hover:text-blue-700"
// //                     >
// //                       <Edit2 className="w-5 h-5" />
// //                     </button>
// //                   )}
// //                   <button
// //                     onClick={() => handleDelete(content.id)}
// //                     className="text-red-500 hover:text-red-700"
// //                   >
// //                     <Trash2 className="w-5 h-5" />
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Type
// //                   </label>
// //                   <select
// //                     value={content.type}
// //                     onChange={(e) => handleMediaTypeChange(content.id, e.target.value)}
// //                     disabled={!editMode[content.id]}
// //                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// //                   >
// //                     <option value="video">Video</option>
// //                     <option value="image">Image</option>
// //                   </select>
// //                 </div>
                
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Upload {content.type === 'video' ? 'Video' : 'Image'}
// //                   </label>
// //                   <input
// //                     type="file"
// //                     accept={content.type === 'video' ? 'video/*' : 'image/*'}
// //                     onChange={(e) => handleMediaUpload(content.id, e.target.files[0])}
// //                     disabled={!editMode[content.id]}
// //                     className="w-full p-2 border rounded-lg"
// //                   />
// //                   {content.mediaUrl && (
// //                     <div className="mt-2">
// //                       {content.type === 'video' ? (
// //                         <video src={content.mediaUrl} className="w-full" controls />
// //                       ) : (
// //                         <img src={content.mediaUrl} alt="Uploaded content" className="w-full" />
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Description
// //                 </label>
// //                 <ReactQuill
// //                   theme="snow"
// //                   value={content.description || ""}
// //                   onChange={(value) => handleMediaDescriptionChange(content.id, value)}
// //                   readOnly={!editMode[content.id]}
// //                   className="h-36 mb-12"
// //                   placeholder="Describe this media content..."
// //                 />
// //               </div>
// //             </div>
// //           ))}

// //           <button
// //             type="button"
// //             onClick={addMediaContent}
// //             className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
// //           >
// //             <Plus className="w-5 h-5 mr-2" />
// //             Add New Media
// //           </button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default MediaContentForm;

// import React, { useState, useEffect } from 'react';
// import { Trash2, Plus, Edit2, Save } from 'lucide-react';
// import ReactQuill from 'react-quill';
// import { Constant } from '@/utils/constant/constant';

// const MediaContentForm = () => {
//   const [mediaContents, setMediaContents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editMode, setEditMode] = useState({});
//   const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   // Fetch existing media contents
//   const fetchMediaContents = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${baseUrl}/company-wts`, {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch media contents');
//       const data = await response.json();
//       // Handle null or empty response
//       setMediaContents(Array.isArray(data.data) && data.data.length > 0 ? data : []);
//     } catch (err) {
//       setError(err.message);
//       setMediaContents([]); // Set to empty array in case of error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMediaContents();
//   }, []);

//   // Handle media type change
//   const handleMediaTypeChange = (id, type) => {
//     setMediaContents(prev =>
//       prev.map(content =>
//         content.id === id ? { ...content, type } : content
//       )
//     );
//   };

//   // Handle media description change
//   const handleMediaDescriptionChange = (id, description) => {
//     setMediaContents(prev =>
//       prev.map(content =>
//         content.id === id ? { ...content, description } : content
//       )
//     );
//   };

//   // Handle media upload
//   const handleMediaUpload = async (id, file) => {
//     const formData = new FormData();
//     formData.append('media_upload', file);

//     try {
//       const response = await fetch(`${baseUrl}/company-wts`, {
//         method: 'POST',
//         headers: {
//           Authorization: token,
//         },
//         body: formData
//       });
//       if (!response.ok) throw new Error('Upload failed');
//       const { url } = await response.json();
      
//       setMediaContents(prev =>
//         prev.map(content =>
//           content.id === id ? { ...content, mediaUrl: url } : content
//         )
//       );
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Add new media content
//   const addMediaContent = () => {
//     const newContent = {
//       id: `temp-${Date.now()}`,
//       type: 'video',
//       description: '',
//       mediaUrl: null
//     };
//     setMediaContents(prev => [...prev, newContent]);
//     setEditMode(prev => ({ ...prev, [newContent.id]: true }));
//   };

//   // Save media content
//   const handleSave = async (content) => {
//     try {
//       const method = content.id.startsWith('temp-') ? 'POST' : 'PATCH';
//       const url = content.id.startsWith('temp-') 
//         ? `${baseUrl}/company-wts`
//         : `${baseUrl}/company-teams/${content.id}`;

//       const response = await fetch(url, {
//         method,
//         headers: { 
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//         body: JSON.stringify({
//           type: content.type,
//           description: content.description,
//           mediaUrl: content.mediaUrl
//         })
//       });

//       if (!response.ok) throw new Error('Failed to save media content');
      
//       const savedContent = await response.json();
//       setMediaContents(prev =>
//         prev.map(item =>
//           item.id === content.id ? { ...savedContent, id: savedContent.id || item.id } : item
//         )
//       );
//       setEditMode(prev => ({ ...prev, [savedContent.id]: false }));
//     } catch (err) {
//       setError(err.message);
//     }
//   };
// console.log(mediaContents,"<<<<<<");
//   // Delete media content
//   const handleDelete = async (id) => {
//     try {
//       if (!id.startsWith('temp-')) {
//         const response = await fetch(`${baseUrl}/company-teams/${id}`, {
//           method: 'DELETE',
//           headers: {
//             Authorization: token, 
//           },
//         });
//         if (!response.ok) throw new Error('Failed to delete media content');
//       }
//       setMediaContents(prev => prev.filter(content => content.id !== id));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Toggle edit mode
//   const toggleEdit = (id) => {
//     setEditMode(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className="space-y-8">
//       <h2 className="text-2xl font-bold">Watch What We Have to Say</h2>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center p-4">Loading...</div>
//       ) : (
//         <>
//           {mediaContents.map((content) => (
//             <div key={content.id} className="p-6 bg-gray-50 rounded-lg">
//               <div className="flex justify-between items-center mb-4">
//                 <h5 className="text-lg font-medium text-gray-900">
//                   Media Content #{content.id}
//                 </h5>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleSave(content)}
//                     className="text-green-500 hover:text-green-700"
//                   >
//                     <Save className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => toggleEdit(content.id)}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     <Edit2 className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(content.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Type
//                   </label>
//                   <select
//                     value={content.type}
//                     onChange={(e) => handleMediaTypeChange(content.id, e.target.value)}
//                     disabled={!editMode[content.id]}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="video">Video</option>
//                     <option value="image">Image</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Upload {content.type === 'video' ? 'Video' : 'Image'}
//                   </label>
//                   <input
//                     type="file"
//                     accept={content.type === 'video' ? 'video/*' : 'image/*'}
//                     onChange={(e) => handleMediaUpload(content.id, e.target.files[0])}
//                     disabled={!editMode[content.id]}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                   {content.mediaUrl && (
//                     <div className="mt-2">
//                       {content.type === 'video' ? (
//                         <video src={content.mediaUrl} className="w-full" controls />
//                       ) : (
//                         <img src={content.mediaUrl} alt="Uploaded content" className="w-full" />
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description
//                 </label>
//                 <ReactQuill
//                   theme="snow"
//                   value={content.description || ""}
//                   onChange={(value) => handleMediaDescriptionChange(content.id, value)}
//                   readOnly={!editMode[content.id]}
//                   className="h-36 mb-12"
//                   placeholder="Describe this media content..."
//                 />
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addMediaContent}
//             className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Add New Media
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default MediaContentForm;

// import React, { useState, useEffect } from 'react';
// import { Trash2, Plus, Edit2, Save, X } from 'lucide-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Constant } from '@/utils/constant/constant';

// const MediaContentManager = () => {
//   const [mediaItems, setMediaItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [newItem, setNewItem] = useState(null);
//   const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   useEffect(() => {
//     fetchMediaItems();
//   }, []);

//   const fetchMediaItems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${baseUrl}/company-wts`, {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch media items');
//       const result = await response.json();
//       if (result.status === 'success' && Array.isArray(result.data)) {
//         console.log(result.data);
//         setMediaItems(result.data);
//       } else {
//         throw new Error('Invalid data format');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (id) => {
//     setEditingId(id);
//   };

//   const handleSave = async (item) => {
//     try {
//       const response = await fetch(`${baseUrl}/company-wts/${item.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${token}`,
//         },
//         body: JSON.stringify(item),
//       });
//       if (!response.ok) throw new Error('Failed to update item');
//       await fetchMediaItems();
//       setEditingId(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`${baseUrl}/company-wts/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to delete item');
//       await fetchMediaItems();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleAddNew = () => {
//     setNewItem({ title: '', description: '', media_url: '' });
//   };

//   const handleSaveNew = async () => {
//     if (!newItem) return;
//     try {
//       const response = await fetch(`${baseUrl}/company-wts`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${token}`,
//         },
//         body: JSON.stringify(newItem),
//       });
//       if (!response.ok) throw new Error('Failed to add new item');
//       await fetchMediaItems();
//       setNewItem(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleCancelNew = () => {
//     setNewItem(null);
//   };

//   if (loading) return <div className="text-center p-4">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Media Content Manager</h1>
      
//       {mediaItems.map((item) => (
//         <div key={item.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
//           {editingId === item.id ? (
//             <div>
//               <input
//                 type="text"
//                 value={item.title}
//                 onChange={(e) => setMediaItems(mediaItems.map(i => i.id === item.id ? { ...i, title: e.target.value } : i))}
//                 className="w-full p-2 mb-2 border rounded"
//                 placeholder="Title"
//               />
//               <ReactQuill
//                 value={item.description}
//                 onChange={(content) => setMediaItems(mediaItems.map(i => i.id === item.id ? { ...i, description: content } : i))}
//                 className="mb-2"
//               />
//               <input
//                 type="text"
//                 value={item.media_url}
//                 onChange={(e) => setMediaItems(mediaItems.map(i => i.id === item.id ? { ...i, media_url: e.target.value } : i))}
//                 className="w-full p-2 mb-2 border rounded"
//                 placeholder="Media URL"
//               />
//               <div className="flex justify-end space-x-2">
//                 <button onClick={() => handleSave(item)} className="bg-green-500 text-white px-4 py-2 rounded">
//                   <Save className="w-5 h-5" />
//                 </button>
//                 <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-xl font-semibold">{item.title || 'Untitled'}</h2>
//               <div dangerouslySetInnerHTML={{ __html: item.description }} className="my-2" />
//               {item.media_url && (
//                 <div className="mt-2">
//                   <img src={item.media_url} alt={item.title} className="max-w-full h-auto rounded" />
//                 </div>
//               )}
//               <div className="flex justify-end space-x-2 mt-2">
//                 <button onClick={() => handleEdit(item.id)} className="text-blue-500">
//                   <Edit2 className="w-5 h-5" />
//                 </button>
//                 <button onClick={() => handleDelete(item.id)} className="text-red-500">
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       {newItem ? (
//         <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//           <input
//             type="text"
//             value={newItem.title || ''}
//             onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="Title"
//           />
//           <ReactQuill
//             value={newItem.description || ''}
//             onChange={(content) => setNewItem({ ...newItem, description: content })}
//             className="mb-2"
//           />
//           <input
//             type="text"
//             value={newItem.media_url || ''}
//             onChange={(e) => setNewItem({ ...newItem, media_url: e.target.value })}
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="Media URL"
//           />
//           <div className="flex justify-end space-x-2">
//             <button onClick={handleSaveNew} className="bg-green-500 text-white px-4 py-2 rounded">
//               Save
//             </button>
//             <button onClick={handleCancelNew} className="bg-gray-500 text-white px-4 py-2 rounded">
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button onClick={handleAddNew} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
//           <Plus className="w-5 h-5 mr-2" /> Add New Media
//         </button>
//       )}
      
//       <footer className="mt-8 text-center text-gray-500">
//         © 2024 All Rights Reserved.
//       </footer>
//     </div>
//   );
// };

// export default MediaContentManager;

// import React, { useState, useEffect } from 'react';
// import { Trash2, Plus, Edit2, Save, X, Upload } from 'lucide-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Constant } from '@/utils/constant/constant';

// const MediaContentManager = () => {
//   const [mediaItems, setMediaItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [newItem, setNewItem] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [editSelectedFile, setEditSelectedFile] = useState(null);
//   const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   useEffect(() => {
//     fetchMediaItems();
//   }, []);

//   const fetchMediaItems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${baseUrl}/company-wts`, {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch media items');
//       const result = await response.json();
//       if (result.status === 'success' && Array.isArray(result.data)) {
//         setMediaItems(result.data);
//       } else {
//         throw new Error('Invalid data format');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (e, isEdit = false) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (isEdit) {
//         setEditSelectedFile(file);
//       } else {
//         setSelectedFile(file);
//       }
//     }
//   };

//   const handleEdit = (id) => {
//     setEditingId(id);
//     setEditSelectedFile(null);
//   };

//   const handleSave = async (item) => {
//     try {
//       const formData = new FormData();
//       formData.append('title', item.title);
//       formData.append('description', item.description);
//       if (editSelectedFile) {
//         formData.append('media_upload', editSelectedFile);
//       }

//       const response = await fetch(`${baseUrl}/company-wts/${item.id}`, {
//         method: 'PATCH',
//         headers: {
//           Authorization: `${token}`,
//         },
//         body: formData,
//       });
//       if (!response.ok) throw new Error('Failed to update item');
//       await fetchMediaItems();
//       setEditingId(null);
//       setEditSelectedFile(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`${baseUrl}/company-wts/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to delete item');
//       await fetchMediaItems();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleAddNew = () => {
//     setNewItem({ title: '', description: '' });
//     setSelectedFile(null);
//   };

//   const handleSaveNew = async () => {
//     if (!newItem || !selectedFile) return;
//     try {
//       const formData = new FormData();
//       formData.append('title', newItem.title);
//       formData.append('description', newItem.description);
//       formData.append('media_upload', selectedFile);

//       const response = await fetch(`${baseUrl}/company-wts`, {
//         method: 'POST',
//         headers: {
//           Authorization: `${token}`,
//         },
//         body: formData,
//       });
//       if (!response.ok) throw new Error('Failed to add new item');
//       await fetchMediaItems();
//       setNewItem(null);
//       setSelectedFile(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleCancelNew = () => {
//     setNewItem(null);
//     setSelectedFile(null);
//   };

//   if (loading) return <div className="text-center p-4">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Media Content Manager</h1>
      
//       {mediaItems.map((item) => (
//         <div key={item.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
//           {editingId === item.id ? (
//             <div>
//               <input
//                 type="text"
//                 value={item.title}
//                 onChange={(e) => setMediaItems(mediaItems.map(i => i.id === item.id ? { ...i, title: e.target.value } : i))}
//                 className="w-full p-2 mb-2 border rounded"
//                 placeholder="Title"
//               />
//               <ReactQuill
//                 value={item.description}
//                 onChange={(content) => setMediaItems(mediaItems.map(i => i.id === item.id ? { ...i, description: content } : i))}
//                 className="mb-2"
//               />
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Update Image
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageChange(e, true)}
//                   className="w-full"
//                 />
//                 {editSelectedFile && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     Selected: {editSelectedFile.name}
//                   </p>
//                 )}
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button onClick={() => handleSave(item)} className="bg-green-500 text-white px-4 py-2 rounded">
//                   <Save className="w-5 h-5" />
//                 </button>
//                 <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-xl font-semibold">{item.title || 'Untitled'}</h2>
//               <div dangerouslySetInnerHTML={{ __html: item.description }} className="my-2" />
//               {item.media_url && (
//                 <div className="mt-2">
//                   <img src={item.media_url} alt={item.title} className="max-w-full h-auto rounded" />
//                 </div>
//               )}
//               <div className="flex justify-end space-x-2 mt-2">
//                 <button onClick={() => handleEdit(item.id)} className="text-blue-500">
//                   <Edit2 className="w-5 h-5" />
//                 </button>
//                 <button onClick={() => handleDelete(item.id)} className="text-red-500">
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       {newItem ? (
//         <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//           <input
//             type="text"
//             value={newItem.title}
//             onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="Title"
//           />
//           <ReactQuill
//             value={newItem.description}
//             onChange={(content) => setNewItem({ ...newItem, description: content })}
//             className="mb-2"
//           />
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full"
//             />
//             {selectedFile && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Selected: {selectedFile.name}
//               </p>
//             )}
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button 
//               onClick={handleSaveNew} 
//               className={`bg-green-500 text-white px-4 py-2 rounded ${(!selectedFile || !newItem.title) ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={!selectedFile || !newItem.title}
//             >
//               Save
//             </button>
//             <button onClick={handleCancelNew} className="bg-gray-500 text-white px-4 py-2 rounded">
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button onClick={handleAddNew} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
//           <Plus className="w-5 h-5 mr-2" /> Add New Media
//         </button>
//       )}
      
     
//     </div>
//   );
// };

// export default MediaContentManager;

import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, Edit2, Save, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Constant } from '@/utils/constant/constant';

const MediaContentManager = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editSelectedFile, setEditSelectedFile] = useState(null);
  
  const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const fetchMediaItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/company-wts`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch media items');
      const result = await response.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        setMediaItems(result.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMediaItems();
  }, [fetchMediaItems]);

  const handleImageChange = (e, isEdit = false) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (isEdit) {
        setEditSelectedFile(file);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setEditSelectedFile(null);
  };

  const handleSave = async (item, e) => {
    e.preventDefault();
    try {
      setActionLoading(prev => ({ ...prev, [item.id]: true }));
      const formData = new FormData();
      formData.append('title', item.title);
      formData.append('description', item.description);
      if (editSelectedFile) {
        formData.append('media_upload', editSelectedFile);
      }

      const response = await fetch(`${baseUrl}/company-wts/${item.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) throw new Error('Failed to update item');
      const updatedItem = await response.json();
      
      setMediaItems(prev => 
        prev.map(i => i.id === item.id ? { ...i, ...updatedItem.data } : i)
      );
      
      setEditingId(null);
      setEditSelectedFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [item.id]: false }));
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      setActionLoading(prev => ({ ...prev, [id]: true }));
      const response = await fetch(`${baseUrl}/company-wts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete item');
      setMediaItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    setNewItem({ title: '', description: '' });
    setSelectedFile(null);
  };

  const handleSaveNew = async (e) => {
    e.preventDefault();
    if (!newItem || !selectedFile) return;
    
    try {
      setActionLoading(prev => ({ ...prev, new: true }));
      const formData = new FormData();
      formData.append('title', newItem.title);
      formData.append('description', newItem.description);
      formData.append('media_upload', selectedFile);

      const response = await fetch(`${baseUrl}/company-wts`, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) throw new Error('Failed to add new item');
      const result = await response.json();
      
      setMediaItems(prev => [...prev, result.data]);
      setNewItem(null);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, new: false }));
    }
  };

  const handleCancelNew = (e) => {
    e.preventDefault();
    setNewItem(null);
    setSelectedFile(null);
  };

  const handleUpdateField = (id, field, value) => {
    setMediaItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return (
    <div className="text-red-500 text-center p-4">
      {error}
      <button 
        onClick={() => { setError(null); fetchMediaItems(); }}
        className="ml-4 text-blue-500 underline"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Media Content Manager</h1>
      
      {mediaItems.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          {editingId === item.id ? (
            <div>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleUpdateField(item.id, 'title', e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Title"
              />
              <ReactQuill
                value={item.description}
                onChange={(content) => handleUpdateField(item.id, 'description', content)}
                className="mb-2"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, true)}
                  className="w-full"
                />
                {editSelectedFile && (
                  <p className="text-sm text-gray-500 mt-1">
                    Selected: {editSelectedFile.name}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={(e) => handleSave(item, e)} 
                  className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
                  disabled={actionLoading[item.id]}
                >
                  {actionLoading[item.id] ? 'Saving...' : <Save className="w-5 h-5" />}
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); setEditingId(null); }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold">{item.title || 'Untitled'}</h2>
              <div dangerouslySetInnerHTML={{ __html: item.description }} className="my-2" />
              {item.media_url && (
                <div className="mt-2">
                  <img src={item.media_url} alt={item.title} className="max-w-full h-auto rounded" />
                </div>
              )}
              <div className="flex justify-end space-x-2 mt-2">
                <button 
                  onClick={(e) => { e.preventDefault(); handleEdit(item.id); }}
                  className="text-blue-500"
                  disabled={actionLoading[item.id]}
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => handleDelete(item.id, e)}
                  className="text-red-500"
                  disabled={actionLoading[item.id]}
                >
                  {actionLoading[item.id] ? '...' : <Trash2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {newItem ? (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Title"
          />
          <ReactQuill
            value={newItem.description}
            onChange={(content) => setNewItem({ ...newItem, description: content })}
            className="mb-2"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {selectedFile && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={handleSaveNew}
              className={`bg-green-500 text-white px-4 py-2 rounded ${(!selectedFile || !newItem.title || actionLoading.new) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!selectedFile || !newItem.title || actionLoading.new}
            >
              {actionLoading.new ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={handleCancelNew}
              className="bg-gray-500 text-white px-4 py-2 rounded"
              disabled={actionLoading.new}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={handleAddNew}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Media
        </button>
      )}
    </div>
  );
};

export default MediaContentManager;