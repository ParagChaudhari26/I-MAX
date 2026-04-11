import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { trainingProgramsApi } from '../../../services/api';

function TrainingProgramsManager() {
  const { token } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [selectedType, setSelectedType] = useState('All'); // Start with 'All' instead of 'Online'
  
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
    description: { en: '', hi: '', mr: '' },
    type: 'Online',
    duration: '',
    price: '',
    instructor: '',
    schedule: '',
    isActive: true,
    imageUrl: '',
    syllabus: []
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true);
      const data = await trainingProgramsApi.getAll(token);
      setPrograms(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Filter programs based on selected type
  useEffect(() => {
    if (selectedType === 'All') {
      setFilteredPrograms(programs);
    } else {
      const filtered = programs.filter(program => program.type === selectedType);
      setFilteredPrograms(filtered);
    }
  }, [programs, selectedType]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // Initialize filteredPrograms when programs first load
  useEffect(() => {
    if (programs.length > 0) {
      if (selectedType === 'All') {
        setFilteredPrograms(programs);
      } else {
        setFilteredPrograms(programs.filter(program => program.type === selectedType));
      }
    }
  }, [programs, selectedType]);

  const resetForm = () => {
    setFormData({
      title: { en: '', hi: '', mr: '' },
      description: { en: '', hi: '', mr: '' },
      type: 'Online',
      duration: '',
      price: '', instructor: '', schedule: '', isActive: true, imageUrl: '', syllabus: []
    });
    setFormErrors({});
    setEditingProgram(null);
    setShowForm(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.en.trim()) errors.title = 'Title (English) is required';
    if (!formData.description.en.trim()) errors.description = 'Description (English) is required';
    if (!formData.duration.trim()) errors.duration = 'Duration is required';
    if (!formData.price || parseFloat(formData.price) < 0) errors.price = 'Valid price is required';
    if (!formData.instructor.trim()) errors.instructor = 'Instructor is required';
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
        price: parseFloat(formData.price),
      };

      if (editingProgram?._id) {
        await trainingProgramsApi.update(token, editingProgram._id, payload);
      } else {
        await trainingProgramsApi.create(token, payload);
      }

      await fetchPrograms();
      resetForm();
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      title: normalizeLocalized(program.title),
      description: normalizeLocalized(program.description),
      type: program.type,
      duration: program.duration,
      price: program.price.toString(),
      instructor: program.instructor,
      schedule: program.schedule || '',
      isActive: program.isActive,
      imageUrl: program.imageUrl || '',
      syllabus: program.syllabus || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this training program?')) return;
    
    try {
      await trainingProgramsApi.delete(token, id);
      await fetchPrograms();
    } catch (err) {
      setError(err.message);
    }
  };

  const addSyllabusItem = () => {
    setFormData(prev => ({
      ...prev,
      syllabus: [...prev.syllabus, { topic: '', duration: '' }]
    }));
  };

  const updateSyllabusItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      syllabus: prev.syllabus.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeSyllabusItem = (index) => {
    setFormData(prev => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== index)
    }));
  };

  if (loading && programs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a5c40]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-serif">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#3a5c40]">Training Programs</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] text-white px-4 py-2 rounded-lg hover:from-[#2d4a32] hover:to-[#3a6340] transition-colors"
        >
          Add New Program
        </button>
      </div>

      {/* Filter Toggle Buttons */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-gray-100 p-1">
          <button
            onClick={() => setSelectedType('Online')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedType === 'Online'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Online Courses
          </button>
          <button
            onClick={() => setSelectedType('In-Person')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedType === 'In-Person'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            In-Person Courses
          </button>
          <button
            onClick={() => setSelectedType('All')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedType === 'All'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All Courses
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-[#d6c7b0]">
          <div className="text-2xl font-bold text-green-600">
            {programs.filter(p => p.type === 'Online').length}
          </div>
          <div className="text-sm text-[#6b5344]">Online Courses</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border border-[#d6c7b0]">
          <div className="text-2xl font-bold text-orange-600">
            {programs.filter(p => p.type === 'In-Person').length}
          </div>
          <div className="text-sm text-[#6b5344]">In-Person Courses</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border border-[#d6c7b0]">
          <div className="text-2xl font-bold text-[#3a5c40]">
            {programs.length}
          </div>
          <div className="text-sm text-[#6b5344]">Total Courses</div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-[#d6c7b0]">
          <h2 className="text-xl font-semibold mb-4 text-[#3a5c40]">
            {editingProgram ? 'Edit Training Program' : 'Add New Training Program'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Title (English) *</label>
                <input
                  type="text"
                  value={formData.title.en}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, en: e.target.value } }))}
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
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                >
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Duration *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 4 weeks"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.duration ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.duration && <p className="text-red-500 text-sm mt-1">{formErrors.duration}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Price *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.price ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.price && <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Instructor *</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.instructor ? 'border-red-500' : 'border-[#d6c7b0]'}`}
                />
                {formErrors.instructor && <p className="text-red-500 text-sm mt-1">{formErrors.instructor}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Schedule</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                  placeholder="e.g., Mon-Fri 9AM-5PM"
                  className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Description (English) *</label>
              <textarea
                value={formData.description.en}
                onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, en: e.target.value } }))}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a5c40] ${formErrors.description ? 'border-red-500' : 'border-[#d6c7b0]'}`}
              />
              {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Description (Hindi)</label>
              <textarea
                value={formData.description.hi}
                onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, hi: e.target.value } }))}
                rows={3}
                className="w-full px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Description (Marathi)</label>
              <textarea
                value={formData.description.mr}
                onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description, mr: e.target.value } }))}
                rows={3}
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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-[#5a4a3a]">Syllabus</label>
                <button
                  type="button"
                  onClick={addSyllabusItem}
                  className="text-[#3a5c40] hover:text-[#2d4a32] text-sm"
                >
                  + Add Topic
                </button>
              </div>
              {formData.syllabus.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item.topic}
                    onChange={(e) => updateSyllabusItem(index, 'topic', e.target.value)}
                    placeholder="Topic"
                    className="flex-1 px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                  />
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => updateSyllabusItem(index, 'duration', e.target.value)}
                    placeholder="Duration"
                    className="w-32 px-3 py-2 border border-[#d6c7b0] rounded-lg focus:ring-2 focus:ring-[#3a5c40]"
                  />
                  <button
                    type="button"
                    onClick={() => removeSyllabusItem(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 text-[#3a5c40] focus:ring-[#3a5c40] border-[#d6c7b0] rounded"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-[#5a4a3a]">Active</label>
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
                {submitting ? 'Saving...' : (editingProgram ? 'Update' : 'Create')}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5a4a3a] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#d6c7b0]">
            {filteredPrograms.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-[#6b5344]">
                  {selectedType === 'All' 
                    ? "No training programs found. Click \"Add New Program\" to create one."
                    : `No ${selectedType.toLowerCase()} programs found.`
                  }
                </td>
              </tr>
            ) : (
              filteredPrograms.map((program) => (
                <tr key={program._id} className="hover:bg-[#f8f5f0]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#3a5c40]">{typeof program.title === 'string' ? program.title : (program.title?.en || '')}</div>
                    <div className="text-sm text-[#6b5344]">{program.instructor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      program.type === 'Online' ? 'bg-[#e8f0e4] text-[#3a5c40]' : 'bg-[#f0e8d8] text-[#6b5344]'
                    }`}>
                      {program.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6b5344]">{program.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6b5344]">₹{program.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      program.isActive ? 'bg-[#e8f0e4] text-[#3a5c40]' : 'bg-[#f0e8d8] text-[#6b5344]'
                    }`}>
                      {program.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEdit(program)}
                      className="text-[#3a5c40] hover:text-[#2d4a32] mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(program._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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

export default TrainingProgramsManager;
