import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { blogsApi } from '../../../services/api';

function BlogsManager() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const normalizeLocalized = (value) => {
    if (!value) return { en: '', hi: '', mr: '' };
    if (typeof value === 'string') return { en: value, hi: '', mr: '' };
    return {
      en: value.en || '',
      hi: value.hi || '',
      mr: value.mr || '',
    };
  };

  const [formData, setFormData] = useState({
    title: { en: '', hi: '', mr: '' },
    slug: '',
    content: { en: '', hi: '', mr: '' },
    excerpt: { en: '', hi: '', mr: '' },
    author: '',
    tags: '',
    category: '',
    featuredImage: '',
    featuredImagePublicId: '',
    isPublished: false,
    publishDate: '',
    readTime: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await blogsApi.getAll(token);
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
      title: { en: '', hi: '', mr: '' },
      slug: '',
      content: { en: '', hi: '', mr: '' },
      excerpt: { en: '', hi: '', mr: '' },
      author: '',
      tags: '', category: '', featuredImage: '', featuredImagePublicId: '', isPublished: false,
      publishDate: '', readTime: ''
    });
    setFormErrors({});
    setEditingItem(null);
    setShowForm(false);
    setImagePreview(null);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.en.trim()) errors.title = 'Title (English) is required';
    if (!formData.content.en.trim()) errors.content = 'Content (English) is required';
    if (!formData.excerpt.en.trim()) errors.excerpt = 'Excerpt (English) is required';
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
      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title.en),
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        readTime: formData.readTime ? parseInt(formData.readTime) : undefined,
        publishDate: formData.isPublished && formData.publishDate 
          ? new Date(formData.publishDate).toISOString() 
          : formData.isPublished ? new Date().toISOString() : undefined
      };

      if (editingItem?._id) {
        await blogsApi.update(token, editingItem._id, payload);
      } else {
        await blogsApi.create(token, payload);
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
      title: normalizeLocalized(item.title),
      slug: item.slug,
      content: normalizeLocalized(item.content),
      excerpt: normalizeLocalized(item.excerpt),
      author: item.author,
      tags: item.tags ? item.tags.join(', ') : '',
      category: item.category,
      featuredImage: item.featuredImage || '',
      featuredImagePublicId: item.featuredImagePublicId || '',
      isPublished: item.isPublished,
      publishDate: item.publishDate ? new Date(item.publishDate).toISOString().split('T')[0] : '',
      readTime: item.readTime ? item.readTime.toString() : ''
    });
    setImagePreview(item.featuredImage || null);
    setShowForm(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setFormErrors({ ...formErrors, image: 'Please select an image file' });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors({ ...formErrors, image: 'Image size must be less than 5MB' });
      return;
    }

    setUploadingImage(true);
    setFormErrors({ ...formErrors, image: null });

    try {
      const response = await blogsApi.uploadImage(token, file);
      
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          featuredImage: response.data.url,
          featuredImagePublicId: response.data.publicId
        }));
        setImagePreview(response.data.url);
      }
    } catch (err) {
      setFormErrors({ ...formErrors, image: err.message || 'Failed to upload image' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = async () => {
    if (formData.featuredImagePublicId) {
      try {
        await blogsApi.deleteImage(token, formData.featuredImagePublicId);
      } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      featuredImage: '',
      featuredImagePublicId: ''
    }));
    setImagePreview(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await blogsApi.delete(token, id);
      await fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await blogsApi.togglePublish(token, id);
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
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Title (English) *</label>
                <input
                  type="text"
                  value={formData.title.en}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData(prev => ({ 
                      ...prev, 
                      title: { ...prev.title, en: title },
                      slug: prev.slug || generateSlug(title)
                    }));
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.title ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Title (Hindi)</label>
                <input
                  type="text"
                  value={formData.title.hi}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, hi: e.target.value } }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Title (Marathi)</label>
                <input
                  type="text"
                  value={formData.title.mr}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, mr: e.target.value } }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
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
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Excerpt (English) *</label>
              <textarea
                value={formData.excerpt.en}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: { ...prev.excerpt, en: e.target.value } }))}
                rows={2}
                placeholder="Brief summary of the blog post"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.excerpt ? 'border-red-500' : 'border-[#d6c7b0]'}`}
              />
              {formErrors.excerpt && <p className="text-red-500 text-sm mt-1">{formErrors.excerpt}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Excerpt (Hindi)</label>
              <textarea
                value={formData.excerpt.hi}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: { ...prev.excerpt, hi: e.target.value } }))}
                rows={2}
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Excerpt (Marathi)</label>
              <textarea
                value={formData.excerpt.mr}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: { ...prev.excerpt, mr: e.target.value } }))}
                rows={2}
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Content (English) *</label>
              <textarea
                value={formData.content.en}
                onChange={(e) => setFormData(prev => ({ ...prev, content: { ...prev.content, en: e.target.value } }))}
                rows={10}
                placeholder="Write your blog content here..."
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.content ? 'border-red-500' : 'border-[#d6c7b0]'}`}
              />
              {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Content (Hindi)</label>
              <textarea
                value={formData.content.hi}
                onChange={(e) => setFormData(prev => ({ ...prev, content: { ...prev.content, hi: e.target.value } }))}
                rows={6}
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Content (Marathi)</label>
              <textarea
                value={formData.content.mr}
                onChange={(e) => setFormData(prev => ({ ...prev, content: { ...prev.content, mr: e.target.value } }))}
                rows={6}
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Featured Image</label>
              <div className="space-y-3">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-[#d6c7b0]"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-[#d6c7b0] border-dashed rounded-lg cursor-pointer bg-[#f8f5f2] hover:bg-[#f0e8d8] transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-[#6b5344]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2 text-sm text-[#6b5344]">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-[#6b5344]">PNG, JPG, GIF, WEBP (MAX. 5MB)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                )}
                {uploadingImage && (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3a5c40]"></div>
                    <span className="ml-2 text-[#6b5344]">Uploading...</span>
                  </div>
                )}
                {formErrors.image && <p className="text-red-500 text-sm">{formErrors.image}</p>}
              </div>
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
                    <div className="text-sm font-medium text-[#3a5c40]">{typeof blog.title === 'string' ? blog.title : (blog.title?.en || '')}</div>
                    <div className="text-sm text-[#6b5344] truncate max-w-xs">{typeof blog.excerpt === 'string' ? blog.excerpt : (blog.excerpt?.en || '')}</div>
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
