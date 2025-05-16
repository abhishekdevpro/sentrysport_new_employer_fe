

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
  const baseImageUrl = "https://api.sentryspot.co.uk";
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
    <div className="md:max-w-5xl md:mx-auto md:p-4">
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
            <div className=''>
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