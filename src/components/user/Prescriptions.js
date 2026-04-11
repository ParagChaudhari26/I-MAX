import React, { useEffect, useState } from 'react';
import { userApi } from '../../services/api';
import { FaDownload, FaEye, FaTimes, FaFilePdf, FaImage } from 'react-icons/fa';

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

  useEffect(() => {
    // Get username from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.username || '');
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    fetchPrescriptions();
  }, [page]);

  const fetchPrescriptions = async () => {
    if (!userToken) {
      setError('Please log in to view prescriptions');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await userApi.getPrescriptions(userToken, {
        page: page.toString(),
        limit: '10'
      });
      
      setPrescriptions(response.data || []);
      setPagination(response.pagination || { page: 1, limit: 10, total: 0, pages: 1 });
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
      setError('Failed to load prescriptions');
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setImageModalOpen(true);
  };

  const closeModal = () => {
    setImageModalOpen(false);
    setSelectedPrescription(null);
  };

  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'prescription';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading && !prescriptions.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Prescriptions</h1>
        {userName && (
          <p className="text-sm text-gray-600 mt-1">Patient: <span className="font-semibold">{userName}</span></p>
        )}
        <p className="text-sm text-gray-600">View and download your prescription images</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {prescriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-500 text-lg">No prescriptions found</p>
          <p className="text-gray-400 text-sm mt-2">Your prescriptions will appear here once uploaded by admin</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prescriptions.map((prescription) => (
                    <tr key={prescription._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(prescription.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(prescription.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {prescription.doctorName || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          prescription.fileType === 'pdf' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {prescription.fileType === 'pdf' ? <FaFilePdf className="mr-1" /> : <FaImage className="mr-1" />}
                          {prescription.fileType.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {prescription.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => viewDetails(prescription)}
                            className="text-emerald-600 hover:text-emerald-900 flex items-center gap-1"
                            title="View"
                          >
                            <FaEye /> View
                          </button>
                          <button
                            onClick={() => downloadFile(prescription.fileUrl, `prescription-${prescription._id}`)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            title="Download"
                          >
                            <FaDownload /> Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.pages > 1 && (
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                    disabled={pagination.page === pagination.pages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Image/PDF Viewer Modal */}
      {imageModalOpen && selectedPrescription && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Prescription Details</h2>
                <p className="text-sm text-gray-600">
                  {new Date(selectedPrescription.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {selectedPrescription.doctorName && (
                  <div>
                    <p className="text-sm text-gray-600">Doctor Name</p>
                    <p className="font-semibold text-gray-900">{selectedPrescription.doctorName}</p>
                  </div>
                )}
                {selectedPrescription.notes && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-gray-900">{selectedPrescription.notes}</p>
                  </div>
                )}
              </div>

              {/* File Viewer */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {selectedPrescription.fileType === 'pdf' ? (
                  <iframe
                    src={selectedPrescription.fileUrl}
                    className="w-full h-[600px]"
                    title="Prescription PDF"
                  />
                ) : (
                  <img
                    src={selectedPrescription.fileUrl}
                    alt="Prescription"
                    className="w-full h-auto"
                  />
                )}
              </div>

              {/* Download Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => downloadFile(selectedPrescription.fileUrl, `prescription-${selectedPrescription._id}`)}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                >
                  <FaDownload /> Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prescriptions;
