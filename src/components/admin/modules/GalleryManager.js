import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { galleryApi } from '../../../services/api';
import { FaTrash, FaPlus, FaImage, FaSpinner } from 'react-icons/fa';

const GalleryManager = () => {
  const { token } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Clinic');

  const categories = ['Ayurveda Treatment', 'Training Programs', 'Clinic', 'Events', 'Other'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data } = await galleryApi.getAll(token);
      setImages(data);
    } catch (err) {
      setError('Failed to fetch gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', title || file.name);
      formData.append('category', category);

      await galleryApi.create(token, formData);
      
      // Reset form
      setFile(null);
      setTitle('');
      // Refresh list
      fetchImages();
    } catch (err) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      try {
        await galleryApi.delete(token, id);
        fetchImages();
      } catch (err) {
        setError('Failed to delete image');
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading gallery...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaImage className="text-emerald-600" />
          Photo Gallery Management
        </h2>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
        <h3 className="text-md font-semibold text-gray-700 mb-4">Upload New Image</h3>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-gray-300 rounded-md p-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. Clinic Reception"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 md:col-span-4 mt-2">
            <button
              type="submit"
              disabled={uploading || !file}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {uploading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              Upload Image
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Grid */}
      <h3 className="text-md font-semibold text-gray-700 mb-4">Current Images ({images.length})</h3>
      {images.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No images found in the gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img) => (
            <div key={img._id} className="group relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col justify-between p-2">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Delete Image"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white font-semibold bg-black bg-opacity-60 px-1.5 py-0.5 rounded shadow">
                    {img.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
