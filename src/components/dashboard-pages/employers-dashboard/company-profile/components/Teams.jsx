

import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, Edit2, Save, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Constant } from '@/utils/constant/constant';

const TeamMemberManager = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newMember, setNewMember] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editSelectedFile, setEditSelectedFile] = useState(null);

  const baseUrl = 'https://api.sentryspot.co.uk/api/employeer';
  const baseImageUrl = "https://api.sentryspot.co.uk";

  const token = localStorage.getItem(Constant.USER_TOKEN);

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/company-teams`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      
      if (!response.ok) {
        // Just set empty array instead of throwing error
        setTeamMembers([]);
        return;
      }
      
      const result = await response.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        setTeamMembers(result.data);
      } else {
        setTeamMembers([]);
      }
    } catch (err) {
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

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

  const handleSave = async (member, e) => {
    e.preventDefault();
    try {
      setActionLoading(prev => ({ ...prev, [member.id]: true }));
      const formData = new FormData();
      formData.append('name', member.name);
      formData.append('description', member.description);
      if (editSelectedFile) {
        formData.append('media_upload', editSelectedFile);
      }

      const response = await fetch(`${baseUrl}/company-teams/${member.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update team member');
      const updatedMember = await response.json();

      setTeamMembers(prev =>
        prev.map(m => m.id === member.id ? { ...m, ...updatedMember.data } : m)
      );

      setEditingId(null);
      setEditSelectedFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [member.id]: false }));
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      setActionLoading(prev => ({ ...prev, [id]: true }));
      const response = await fetch(`${baseUrl}/company-teams/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete team member');
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    setNewMember({ name: '', description: '' });
    setSelectedFile(null);
  };

  const handleSaveNew = async (e) => {
    e.preventDefault();
    if (!newMember || !selectedFile) return;

    try {
      setActionLoading(prev => ({ ...prev, new: true }));
      const formData = new FormData();
      formData.append('name', newMember.name);
      formData.append('description', newMember.description);
      formData.append('media_upload', selectedFile);

      const response = await fetch(`${baseUrl}/company-teams`, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add new team member');
      const result = await response.json();

      setTeamMembers(prev => [...prev, result.data]);
      setNewMember(null);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, new: false }));
    }
  };

  const handleCancelNew = (e) => {
    e.preventDefault();
    setNewMember(null);
    setSelectedFile(null);
  };

  const handleUpdateField = (id, field, value) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="md:max-w-5xl md:mx-auto md:p-4">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => { setError(null); fetchTeamMembers(); }}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {teamMembers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white shadow-md rounded-lg p-4">
              {editingId === member.id ? (
                <div>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleUpdateField(member.id, 'name', e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Name"
                  />
                  <ReactQuill
                    value={member.description}
                    onChange={(content) => handleUpdateField(member.id, 'description', content)}
                    className="mb-2"
                  />
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Photo
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
                      onClick={(e) => handleSave(member, e)}
                      className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
                      disabled={actionLoading[member.id]}
                    >
                      {actionLoading[member.id] ? 'Saving...' : <Save className="w-5 h-5" />}
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
                  {member.media && (
                    <div className="mb-4 ">
                      <img
                        src={`${baseImageUrl}${member.media}`}
                        alt={member.name}
                        className="w-24 md:w-auto h-24 md:h-48 object-cover rounded"
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: member.description }}
                    className="my-2 text-gray-600"
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={(e) => { e.preventDefault(); handleEdit(member.id); }}
                      className="text-blue-500"
                      disabled={actionLoading[member.id]}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(member.id, e)}
                      className="text-red-500"
                      disabled={actionLoading[member.id]}
                    >
                      {actionLoading[member.id] ? '...' : <Trash2 className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {teamMembers.length === 0 && !loading && !newMember && (
        <div className="text-center p-8 bg-gray-50 rounded-lg mb-4">
          <p className="text-gray-600 mb-4">No team members available. Start by adding your first team member!</p>
        </div>
      )}

      {newMember ? (
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Add New Team Member</h2>
          <input
            type="text"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Name"
          />
          <ReactQuill
            value={newMember.description}
            onChange={(content) => setNewMember({ ...newMember, description: content })}
            className="mb-2"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
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
              className={`bg-green-500 text-white px-4 py-2 rounded ${(!selectedFile || !newMember.name || actionLoading.new) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!selectedFile || !newMember.name || actionLoading.new}
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Team Member
        </button>
      )}
    </div>
  );
};

export default TeamMemberManager;