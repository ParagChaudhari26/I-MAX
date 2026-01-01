import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function BlogsManager() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    tags: '',
    category: '',
    featuredImage: '',
    isPublished: false,
    publishDate: '',
    readTime: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/blogs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const resetForm = () => {
    setFormData({
      title: '', slug: '', content: '', excerpt: '', author: '',
      tags: '', category: '', featuredImage: '', isPublished: false,
      publishDate: '', readTime: ''
    });
    setFormErrors({});
    setEditingItem(null);
    setShowForm(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.content.trim()) errors.content = 'Content is required';
    if (!formData.excerpt.trim()) errors.excerpt = 'Excerpt is required';
    if (!formData.author.trim()) errors.author = 'Author is required';
    if (!formData.category.trim()) errors.category = 'Category is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const url = editingItem
        ? `${API_BASE_URL}/api/admin/blogs/${editingItem._id}`
        : `${API_BASE_URL}/api/admin/blogs`;
      
      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        readTime: formData.readTime ? parseInt(formData.readTime) : undefined,
        publishDate: formData.isPublished && formData.publishDate 
          ? new Date(formData.publishDate).toISOString() 
          : formData.isPublished ? new Date().toISOString() : undefined
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
        throw new Error(data.error?.message || 'Failed to save blog');
      }

      await fetchBlogs();
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
      slug: item.slug,
      content: item.content,
      excerpt: item.excerpt,
      author: item.author,
      tags: item.tags ? item.tags.join(', ') : '',
      category: item.category,
      featuredImage: item.featuredImage || '',
      isPublished: item.isPublished,
      publishDate: item.publishDate ? new Date(item.publishDate).toISOString().split('T')[0] : '',
      readTime: item.readTime ? item.readTime.toString() : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete blog');
      await fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blogs/${id}/toggle-publish`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to toggle publish status');
      await fetchBlogs();
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

  if (loading && blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a5c40]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-serif">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#3a5c40]">Blogs</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] text-white px-4 py-2 rounded-lg hover:from-[#2d4a32] hover:to-[#3a6340] transition-colors"
        >
          Add New Blog
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
            {editingItem ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData(prev => ({ 
                      ...prev, 
                      title,
                      slug: prev.slug || generateSlug(title)
                    }));
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.title ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="auto-generated-from-title"
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
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
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Ayurveda, Wellness"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.category ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="ayurveda, health, wellness"
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Read Time (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.readTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                  placeholder="Auto-calculated if empty"
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Excerpt *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={2}
                placeholder="Brief summary of the blog post"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.excerpt ? 'border-red-500' : 'border-[#d6c7b0]'}`}
              />
              {formErrors.excerpt && <p className="text-red-500 text-sm mt-1">{formErrors.excerpt}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={10}
                placeholder="Write your blog content here..."
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.content ? 'border-red-500' : 'border-[#d6c7b0]'}`}
              />
              {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Featured Image URL</label>
              <input
                type="text"
                value={formData.featuredImage}
                onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                  className="h-4 w-4 text-[#3a5c40] focus:ring-[#3a5c40] border-[#d6c7b0] rounded"
                />
                <label htmlFor="isPublished" className="ml-2 text-sm text-[#5a4a3a]">Publish immediately</label>
              </div>
              {formData.isPublished && (
                <div>
                  <label className="text-sm text-[#5a4a3a] mr-2">Publish Date:</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                    className="px-3 py-1 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                  />
                </div>
              )}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#d6c7b0]">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-[#6b5344]">
                  No blog posts found. Click "Add New Blog" to create one.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-[#f8f5f0]">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#3a5c40]">{blog.title}</div>
                    <div className="text-sm text-[#6b5344] truncate max-w-xs">{blog.excerpt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-[#e8f0e4] text-[#3a5c40]">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6b5344]">{blog.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      blog.isPublished ? 'bg-[#e8f0e4] text-[#3a5c40]' : 'bg-[#f0e8d8] text-[#6b5344]'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6b5344]">
                    {blog.isPublished ? formatDate(blog.publishDate) : formatDate(blog.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleTogglePublish(blog._id)}
                      className={`mr-2 ${blog.isPublished ? 'text-[#d9a441] hover:text-[#b8862e]' : 'text-[#3a5c40] hover:text-[#2d4a32]'}`}
                    >
                      {blog.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={() => handleEdit(blog)} className="text-[#3a5c40] hover:text-[#2d4a32] mr-2">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-900">Delete</button>
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

export default BlogsManager;
