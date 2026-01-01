import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function NewsEventsManager() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'News',
    publishDate: new Date().toISOString().split('T')[0],
    eventDate: '',
    location: '',
    imageUrl: '',
    isPublished: true,
    author: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/news-events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch news & events');
      const data = await response.json();
      setItems(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setFormData({
      title: '', content: '', type: 'News',
      publishDate: new Date().toISOString().split('T')[0],
      eventDate: '', location: '', imageUrl: '', isPublished: true, author: ''
    });
    setFormErrors({});
    setEditingItem(null);
    setShowForm(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.content.trim()) errors.content = 'Content is required';
    if (!formData.author.trim()) errors.author = 'Author is required';
    if (formData.type === 'Event') {
      if (!formData.eventDate) errors.eventDate = 'Event date is required for events';
      if (!formData.location.trim()) errors.location = 'Location is required for events';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const url = editingItem
        ? `${API_BASE_URL}/api/admin/news-events/${editingItem._id}`
        : `${API_BASE_URL}/api/admin/news-events`;
      
      const payload = {
        ...formData,
        publishDate: formData.publishDate ? new Date(formData.publishDate).toISOString() : new Date().toISOString(),
        eventDate: formData.type === 'Event' && formData.eventDate 
          ? new Date(formData.eventDate).toISOString() 
          : undefined
      };

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || 'Failed to save news/event');
      }

      await fetchItems();
      resetForm();
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      type: item.type,
      publishDate: item.publishDate ? new Date(item.publishDate).toISOString().split('T')[0] : '',
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '',
      location: item.location || '',
      imageUrl: item.imageUrl || '',
      isPublished: item.isPublished,
      author: item.author
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/news-events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete item');
      await fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a5c40]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-serif">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#3a5c40]">News & Events</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] text-white px-4 py-2 rounded-lg hover:from-[#2d4a32] hover:to-[#3a6340] transition-colors"
        >
          Add New Item
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-[#d6c7b0]">
          <h2 className="text-xl font-semibold mb-4 text-[#3a5c40]">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.title ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                >
                  <option value="News">News</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Author *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.author ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.author && <p className="text-red-500 text-sm mt-1">{formErrors.author}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Publish Date</label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
              </div>
              {formData.type === 'Event' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Event Date *</label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.eventDate ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                    />
                    {formErrors.eventDate && <p className="text-red-500 text-sm mt-1">{formErrors.eventDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.location ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                    />
                    {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={5}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.content ? 'border-red-500' : 'border-[#d6c7b0]'}`}
              />
              {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Image URL</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                className="h-4 w-4 text-[#3a5c40] focus:ring-[#3a5c40] border-[#d6c7b0] rounded"
              />
              <label htmlFor="isPublished" className="ml-2 text-sm text-[#5a4a3a]">Published</label>
            </div>

            {formErrors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {formErrors.submit}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] text-white px-6 py-2 rounded-lg hover:from-[#2d4a32] hover:to-[#3a6340] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-[#d6c7b0] text-[#5a4a3a] px-6 py-2 rounded-lg hover:bg-[#c9b89e] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d6c7b0]">
        <table className="min-w-full divide-y divide-[#d6c7b0]">
          <thead className="bg-[#f0e8d8]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#d6c7b0]">
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-[#6b5344]">
                  No news or events found. Click "Add New Item" to create one.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-[#f8f5f0]">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#3a5c40]">{item.title}</div>
                    <div className="text-sm text-[#6b5344]">{item.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.type === 'News' ? 'bg-[#e8f0e4] text-[#3a5c40]' : 'bg-[#f0e8d8] text-[#d9a441]'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6b5344]">
                    {item.type === 'Event' ? formatDate(item.eventDate) : formatDate(item.publishDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.isPublished ? 'bg-[#e8f0e4] text-[#3a5c40]' : 'bg-[#f0e8d8] text-[#6b5344]'
                    }`}>
                      {item.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button onClick={() => handleEdit(item)} className="text-[#3a5c40] hover:text-[#2d4a32] mr-3">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsEventsManager;
