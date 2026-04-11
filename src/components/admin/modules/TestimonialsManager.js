import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { testimonialsApi } from '../../../services/api';

function TestimonialsManager() {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
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
    customerName: '',
    customerLocation: '',
    treatment: { en: '', hi: '', mr: '' },
    testimonialText: { en: '', hi: '', mr: '' },
    rating: 5,
    imageUrl: '',
    isApproved: false,
    dateReceived: new Date().toISOString().split('T')[0]
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const data = await testimonialsApi.getAll(token);
      setTestimonials(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerLocation: '',
      treatment: { en: '', hi: '', mr: '' },
      testimonialText: { en: '', hi: '', mr: '' },
      rating: 5,
      imageUrl: '',
      isApproved: false,
      dateReceived: new Date().toISOString().split('T')[0]
    });
    setFormErrors({});
    setEditingItem(null);
    setShowForm(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.customerName.trim()) errors.customerName = 'Customer name is required';
    if (!formData.treatment.en.trim()) errors.treatment = 'Treatment (English) is required';
    if (!formData.testimonialText.en.trim()) errors.testimonialText = 'Testimonial text (English) is required';
    if (formData.rating < 1 || formData.rating > 5) errors.rating = 'Rating must be between 1 and 5';
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
        rating: parseInt(formData.rating),
        dateReceived: formData.dateReceived ? new Date(formData.dateReceived).toISOString() : new Date().toISOString()
      };

      if (editingItem?._id) {
        await testimonialsApi.update(token, editingItem._id, payload);
      } else {
        await testimonialsApi.create(token, payload);
      }

      await fetchTestimonials();
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
      customerName: item.customerName,
      customerLocation: item.customerLocation || '',
      treatment: normalizeLocalized(item.treatment),
      testimonialText: normalizeLocalized(item.testimonialText),
      rating: item.rating,
      imageUrl: item.imageUrl || '',
      isApproved: item.isApproved,
      dateReceived: item.dateReceived ? new Date(item.dateReceived).toISOString().split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await testimonialsApi.delete(token, id);
      await fetchTestimonials();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApprove = async (id, currentStatus) => {
    try {
      // Backend exposes a toggle endpoint; we keep the UI behavior the same.
      await testimonialsApi.toggleApproval(token, id);
      await fetchTestimonials();
    } catch (err) {
      setError(err.message);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading && testimonials.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a5c40]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-serif">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#3a5c40]">Testimonials</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] text-white px-4 py-2 rounded-lg hover:from-[#2d4a32] hover:to-[#3a6340] transition-colors"
        >
          Add New Testimonial
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
            {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.customerName ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.customerName && <p className="text-red-500 text-sm mt-1">{formErrors.customerName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Location</label>
                <input
                  type="text"
                  value={formData.customerLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerLocation: e.target.value }))}
                  placeholder="e.g., Mumbai, India"
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Treatment (English) *</label>
                <input
                  type="text"
                  value={formData.treatment.en}
                  onChange={(e) => setFormData(prev => ({ ...prev, treatment: { ...prev.treatment, en: e.target.value } }))}
                  placeholder="e.g., Panchakarma"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.treatment ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.treatment && <p className="text-red-500 text-sm mt-1">{formErrors.treatment}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Treatment (Hindi)</label>
                <input
                  type="text"
                  value={formData.treatment.hi}
                  onChange={(e) => setFormData(prev => ({ ...prev, treatment: { ...prev.treatment, hi: e.target.value } }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Treatment (Marathi)</label>
                <input
                  type="text"
                  value={formData.treatment.mr}
                  onChange={(e) => setFormData(prev => ({ ...prev, treatment: { ...prev.treatment, mr: e.target.value } }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Rating *</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>{renderStars(num)} ({num})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Date Received</label>
                <input
                  type="date"
                  value={formData.dateReceived}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateReceived: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
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
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Testimonial Text (English) *</label>
              <textarea
                value={formData.testimonialText.en}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonialText: { ...prev.testimonialText, en: e.target.value } }))}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.testimonialText ? 'border-red-500' : 'border-[#d6c7b0]'}`}
              />
              {formErrors.testimonialText && <p className="text-red-500 text-sm mt-1">{formErrors.testimonialText}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Testimonial Text (Hindi)</label>
              <textarea
                value={formData.testimonialText.hi}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonialText: { ...prev.testimonialText, hi: e.target.value } }))}
                rows={3}
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Testimonial Text (Marathi)</label>
              <textarea
                value={formData.testimonialText.mr}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonialText: { ...prev.testimonialText, mr: e.target.value } }))}
                rows={3}
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isApproved"
                checked={formData.isApproved}
                onChange={(e) => setFormData(prev => ({ ...prev, isApproved: e.target.checked }))}
                className="h-4 w-4 text-[#3a5c40] focus:ring-[#3a5c40] border-[#d6c7b0] rounded"
              />
              <label htmlFor="isApproved" className="ml-2 text-sm text-[#5a4a3a]">Approved for display</label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center text-[#6b5344] border border-[#d6c7b0]">
            No testimonials found. Click "Add New Testimonial" to create one.
          </div>
        ) : (
          testimonials.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-6 border border-[#d6c7b0]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-[#3a5c40]">{item.customerName}</h3>
                  {item.customerLocation && (
                    <p className="text-sm text-[#6b5344]">{item.customerLocation}</p>
                  )}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.isApproved ? 'bg-[#e8f0e4] text-[#3a5c40]' : 'bg-[#f0e8d8] text-[#d9a441]'
                }`}>
                  {item.isApproved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <p className="text-[#d9a441] mb-2">{renderStars(item.rating)}</p>
              <p className="text-sm text-[#6b5344] mb-2">Treatment: {typeof item.treatment === 'string' ? item.treatment : (item.treatment?.en || '')}</p>
              <p className="text-[#5a4a3a] text-sm line-clamp-3 mb-4">{typeof item.testimonialText === 'string' ? item.testimonialText : (item.testimonialText?.en || '')}</p>
              <div className="flex gap-2 pt-3 border-t border-[#d6c7b0]">
                <button
                  onClick={() => handleApprove(item._id, item.isApproved)}
                  className={`text-sm px-3 py-1 rounded ${
                    item.isApproved 
                      ? 'bg-[#f0e8d8] text-[#d9a441] hover:bg-[#e8dcc8]' 
                      : 'bg-[#e8f0e4] text-[#3a5c40] hover:bg-[#d8e8d4]'
                  }`}
                >
                  {item.isApproved ? 'Unapprove' : 'Approve'}
                </button>
                <button onClick={() => handleEdit(item)} className="text-sm text-[#3a5c40] hover:text-[#2d4a32]">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="text-sm text-red-600 hover:text-red-900">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TestimonialsManager;
