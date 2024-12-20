import React, { useEffect, useState } from "react";
import axios from "axios";



import DefaulHeader2 from "@/components/header/DefaulHeader2";
import MobileMenu from "@/components/header/MobileMenu";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { AiFillFacebook } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import { Constant } from "@/utils/constant/constant";
import { Link } from "react-router-dom";
import FilterleftSidebar from "@/components/community/FilterleftSidebar";
const AlertDataTable = () => {

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
  const [activeSharePostId, setActiveSharePostId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showloginmodal, setloginmodal]= useState(false)


  const token = localStorage.getItem(Constant.USER_TOKEN);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      console.log("Image URL: ", imageUrl);
    }
  };

  const addPost = async () => {
    if(!token){
      setloginmodal(true);
      return;
    }
    if (content.trim()) {
      try {
        // Make the API call to create a new post
        const response = await axios.post('https://api.sentryspot.co.uk/api/feed/feed-create', {
          content: content,
          // Include any other necessary fields here
        }, {
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          }
        });
  
        if (response.data && response.data.status === 'success') {
          // Assuming response.data.data contains the new post details
          const newPost = response.data.data;
  
          // Update the posts state with the new post
          setPosts([newPost, ...posts]);
          setContent("");
          setIsAnonymous(false);
          setImage(null);
        } else {
          console.error('Error creating post:', response.data.message);
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };
  


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://api.sentryspot.co.uk/api/feed/feeds');
        if (response.data && Array.isArray(response.data.data.feed_data)) {
          setPosts(response.data.data.feed_data);
        } else {
          console.error('Unexpected API response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const addComment = (postId) => {
    if(!token){
      setloginmodal(true);
      return;
    }


    if (!commentContent.trim()) return;

    axios.post('https://api.sentryspot.co.uk/api/feed/feed-comment', {
      feed_id: postId,
      content: commentContent,
    }, {
      headers: {
        "Authorization": token,
        "Content-Type": "application/json", // Set content type to JSON
      }
    })
    .then(response => {
      if (response.data && response.data.status === 'success') {
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, comments: [...post.comments, { content: commentContent, anonymous: isCommentAnonymous }] } : post
        ));
        setCommentContent('');
        setIsCommentAnonymous(false);
        setActiveCommentPostId(null);
      } else {
        console.error('Error adding comment:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error adding comment:', error);
    });
    
  };

  const handleCopyLink = (postId) => {
    navigator.clipboard.writeText(`https://example.com/post/${postId}`)
      .then(() => alert('Link copied to clipboard'))
      .catch(err => console.error('Error copying link:', err));
  };

  const sharePost = (postId) => {
    setActiveSharePostId(activeSharePostId === postId ? null : postId);

    setCommentContent('');
  };

const handleCancel = ()=>{
setloginmodal(false);
}
const handleLogin = () => {
  setloginmodal(false);
  history.push('/login'); // Redirect to the login page
};

  return (
    <>
      <span className="header-span"></span>

     
    
      <MobileMenu />
      
      <section className="ls-section bg-stone-200">
        <div className="auto-container">
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
              <FilterleftSidebar/>
              </div>
            </div>

            <div className="filters-column hidden-1023 w-1/5 col-md-8 col-sm-8 ms-20">
       <FilterleftSidebar/>
            </div>

            <div className="max-w-xl mp-4">
              <div className="mb-4 bg-white p-3 border-t-8 rounded-t-md border-purple-900">
                <textarea
                  className="w-full p-3 font-medium text-xl bg-gray-100 text-black h-28 border-0"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ask anything (even anonymously)..."
                />
                <button
                  onClick={addPost}
                  className="my-2 bg-blue-950 w-full text-lg text-white px-4 py-2.5 rounded hover:bg-blue-700"
                >
                  Post
                </button>

                {showloginmodal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center  items-center text-center">
          <div className="bg-white p-10 rounded-lg shadow-lg ms-20">
            <h2 className="text-2xl font-bold mb-4 ">You need to login first</h2>
            <p className="mb-4">Please login to do Changes</p>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <div className="btn-box">
            <a
              href="#"
              className="theme-btn btn-style-three call-modal"
              data-bs-toggle="modal"
              data-bs-target="#loginPopupModal"
            >
              Login / Register
            </a>
            
          </div>
            </div>
          </div>
        </div>
      )}
                {content && (
                  <>
                    <div className="mt-2">
                      <label
                        htmlFor="file-upload"
                        className="flex items-center cursor-pointer mt-4 ms-2"
                      >
                        <i className="fas fa-camera text-blue-600 mr-2 text-2xl"></i>
                        <span className="text-gray-700">Upload Image</span>
                        <input
                          type="file"
                          id="file-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {image && (
                        <div className="mb-2 border-2 my-2">
                          <img
                            src={image}
                            alt="Uploaded"
                            className="max-w-full h-auto rounded"
                          />
                        </div>
                      )}
                      <div className="flex items-center mt-4 ms-1">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="hidden"
                        />
                        <label
                          htmlFor="anonymous"
                          className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer border border-gray-900 ${
                            isAnonymous ? "bg-blue-900 text-white" : ""
                          }`}
                        >
                          <i
                            className={`fas fa-${isAnonymous ? "check" : ""}`}
                          ></i>
                        </label>
                        <label
                          htmlFor="anonymous"
                          className="ml-2 text-gray-700"
                        >
                          Post as Anonymous
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white shadow rounded-lg p-4 mb-2"
                    >
                      <div className="flex items-center">
                        {post.isAnonymous && (
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
                            alt="Anonymous"
                            className="w-10 h-10 rounded-full mr-3"
                          /> || <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
                          alt="Anonymous"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        )}
                        <img
                            src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
                            alt="Anonymous"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        <h4 className="font-bold  m-0 flex-col">
                          {post.isAnonymous ? " Anonymous" : post.user || 'User'}
                          <p className="text-xs">{(post.updated_at).split("T")[0]}</p>
                        </h4>
                      </div>
                     
                      <p className="text-gray-700 break-all my-2 p-2 py-4" >
                        {post.content}
                      </p>
                      {post.image && (
                        <div className="mt-2">
                         { <img
                            src={post.image}
                            alt="Uploaded"
                            className="max-w-full h-auto rounded"
                          /> }
                        </div>
                      )}
                    <div className="flex items-center gap-3 mt-2 mb-4">
                      <button
                        className={`mr-4 ${
                          post.liked
                            ? "text-pink-600 text-base"
                            : "text-gray-500 text-base"
                        }`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <i className="fas fa-heart"></i> {post.likes} Likes{" "}
                        {post.liked ? "likes" : ""}
                      </button>
                      <button
                        className="mr-4 text-gray-500 hover:text-blue-500 text-base"
                        onClick={() =>
                          setActiveCommentPostId(
                            activeCommentPostId === post.id ? null : post.id
                          )
                        }
                        >
                        <i className="fas fa-comment"></i>  Comment
                      </button>
                      <button
                        className="mr-4 text-gray-500 hover:text-blue-500 text-base"
                        onClick={() => sharePost(post.id)}
                      >
                        <i className="fas fa-share"></i> Share
                      </button>
                      {activeSharePostId === post.id && (
                        <div className="absolute ms-56 mt-48 text-lg p-2 bg-white border  shadow-lg z-10">
                          <button
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://example.com/post/${post.id}`, '_blank')}
                            className="flex items-center text-blue-600 hover:text-blue-800 border-b p-2"
                          >
                            <AiFillFacebook className="text-xl mr-2" /> Facebook
                          </button>
                          <button
                            onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https://example.com/post/${post.id}`, '_blank')}
                            className="flex items-center text-sky-700 hover:text-blue-900 mt-2 border-b p-2"
                          >
                            <AiFillLinkedin className="text-xl mr-2" /> LinkedIn
                          </button>
                          <button
                            onClick={() => handleCopyLink(post.id)}
                            className="flex items-center text-gray-600 hover:text-gray-800 mt-2 p-2"
                          >
                            <FaRegCopy className="text-xl mr-2" /> Copy Link
                          </button>
                        </div>
                      )}
                    </div>

                    {activeCommentPostId === post.id && (
  <div className="mt-4 ">
    <textarea
      className="w-full p-3 border-1 text-lg  bg-slate-200  border-gray-400 rounded h-32"
      value={commentContent}
      onChange={(e) => setCommentContent(e.target.value)}
      placeholder="Join the conversation..."
    />
    <div className="flex justify-between">
    <div className="flex items-center mt-2">
      <input
        type="checkbox"
        id="comment-anonymous"
        checked={isCommentAnonymous}
        onChange={(e) => setIsCommentAnonymous(e.target.checked)}
        className="hidden"
      />
      <label
        htmlFor="comment-anonymous"
        className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer border border-gray-900 ${
          isCommentAnonymous ? "bg-blue-900 text-white" : ""
        }`}
      >
        <i
          className={`fas fa-${isCommentAnonymous ? "check" : ""}`}
        ></i>
      </label>
      <label
        htmlFor="comment-anonymous"
        className="ml-2 text-gray-700"
      >
        Post anonymous
      </label>
    </div>
    <button
      onClick={() => addComment(post.id)}
      className="my-2 bg-blue-900 text-lg text-white px-4 py-1 w-60 rounded hover:bg-blue-700 "
    >
      Post
    </button>
      </div>

    {/* Render comments */}
   
  </div>
)}
 {post.feed_comments && post.feed_comments.length > 0 ? (
        <div>
          {post.feed_comments.slice(0, showAllComments ? post.feed_comments.length : 1).map((comment, index) => (
            <div key={index} className="border-t py-2 border-gray-300 mt-2">
              <p className="text-gray-700 p-1">{comment.content}</p>
            </div>
          ))}

          {/* Show more/less button */}
          {post.feed_comments.length > 1 && (
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-blue-400 mt-2 text-lg hover:underline"
            >
              {showAllComments ? "See less comments" : `See more comments...`}
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500"></p>
      )}
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </div>
          <div className="filters-column hidden-1023 w-1/4 col-md-8 col-sm-8">
              <FilterleftSidebar/>
            </div>
        </div>
        
      </div>
      
    </section>
    
   
  </>
);
};

export default AlertDataTable;
