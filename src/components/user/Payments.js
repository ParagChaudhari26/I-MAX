import React, { useEffect, useState } from 'react';
import { userApi } from '../../services/api';
import { FaDownload, FaEye, FaTimes, FaFilePdf, FaImage, FaReceipt } from 'react-icons/fa';
import PaymentReceipt from '../PaymentReceipt';

// Hardcoded payments data (will be replaced with API call)
const HARDCODED_PAYMENTS = [
  {
    _id: '1',
    amount: 2500,
    purpose: 'consultation',
    status: 'success',
    transactionId: 'TXN1711234567001',
    paymentMethod: 'UPI',
    createdAt: new Date('2026-03-25')
  },
  {
    _id: '2',
    amount: 5000,
    purpose: 'therapy',
    status: 'success',
    transactionId: 'TXN1711234567002',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2026-03-20')
  },
  {
    _id: '3',
    amount: 1500,
    purpose: 'consultation',
    status: 'success',
    transactionId: 'TXN1711234567003',
    paymentMethod: 'Debit Card',
    createdAt: new Date('2026-03-15')
  },
  {
    _id: '4',
    amount: 8000,
    purpose: 'program',
    status: 'pending',
    transactionId: 'TXN1711234567004',
    paymentMethod: 'Bank Transfer',
    createdAt: new Date('2026-03-10')
  },
  {
    _id: '5',
    amount: 3000,
    purpose: 'therapy',
    status: 'success',
    transactionId: 'TXN1711234567005',
    paymentMethod: 'UPI',
    createdAt: new Date('2026-03-05')
  },
  {
    _id: '6',
    amount: 1200,
    purpose: 'product',
    status: 'failed',
    transactionId: 'TXN1711234567006',
    paymentMethod: 'UPI',
    createdAt: new Date('2026-03-01')
  },
  {
    _id: '7',
    amount: 4500,
    purpose: 'consultation',
    status: 'success',
    transactionId: 'TXN1711234567007',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2026-02-25')
  },
  {
    _id: '8',
    amount: 6000,
    purpose: 'program',
    status: 'success',
    transactionId: 'TXN1711234567008',
    paymentMethod: 'Debit Card',
    createdAt: new Date('2026-02-20')
  }
];

// Sample course payments (will come from backend)
const COURSE_PAYMENTS = [
  {
    _id: 'cp1',
    paymentId: 'pay_MNopQRstUVwxYz1',
    orderId: 'order_ABC123',
    courseTitle: 'Vajikarana (Vitalization) Therapy',
    courseType: 'Online',
    amountUSD: 170,
    amountINR: 15852.50,
    exchangeRate: 93.25,
    status: 'success',
    transactionId: 'TXN1712345678901',
    paymentMethod: 'Razorpay',
    createdAt: new Date('2026-04-04')
  },
  {
    _id: 'cp2',
    paymentId: 'pay_MNopQRstUVwxYz2',
    orderId: 'order_ABC124',
    courseTitle: 'Women Care and Pregnancy Care',
    courseType: 'In-Person',
    amountUSD: 250,
    amountINR: 23312.50,
    exchangeRate: 93.25,
    status: 'success',
    transactionId: 'TXN1712345678902',
    paymentMethod: 'Razorpay',
    createdAt: new Date('2026-04-01')
  }
];

function Payments() {
  const [payments, setPayments] = useState([]);
  const [coursePayments, setCoursePayments] = useState([]);
  const [uploadedReceipts, setUploadedReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receiptsLoading, setReceiptsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [receiptsPagination, setReceiptsPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [activeTab, setActiveTab] = useState('receipts'); // 'receipts', 'courses' or 'other'
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

  // Get user data
  const userData = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;
  const currentUser = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    // Simulate API call with hardcoded data
    setTimeout(() => {
      setPayments(HARDCODED_PAYMENTS);
      setCoursePayments(COURSE_PAYMENTS);
      setTotalPages(1);
      setLoading(false);
    }, 500);
    
    // Fetch uploaded receipts
    if (activeTab === 'receipts') {
      fetchUploadedReceipts();
    }
  }, [page, activeTab]);

  const fetchUploadedReceipts = async () => {
    if (!userToken) {
      setReceiptsLoading(false);
      return;
    }

    try {
      setReceiptsLoading(true);
      
      const response = await userApi.getPaymentReceipts(userToken, {
        page: receiptsPagination.page.toString(),
        limit: '10'
      });
      
      setUploadedReceipts(response.data || []);
      setReceiptsPagination(response.pagination || { page: 1, limit: 10, total: 0, pages: 1 });
    } catch (err) {
      console.error('Error fetching receipts:', err);
    } finally {
      setReceiptsLoading(false);
    }
  };

  const viewReceiptDetails = (receipt) => {
    setSelectedReceipt(receipt);
    setImageModalOpen(true);
  };

  const closeReceiptModal = () => {
    setImageModalOpen(false);
    setSelectedReceipt(null);
  };

  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'receipt';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewDetails = (id) => {
    const payment = HARDCODED_PAYMENTS.find(p => p._id === id);
    setSelectedPayment(payment);
  };

  const viewCourseReceipt = (coursePayment) => {
    const receipt = {
      paymentId: coursePayment.paymentId,
      orderId: coursePayment.orderId,
      courseTitle: coursePayment.courseTitle,
      courseType: coursePayment.courseType,
      amountUSD: coursePayment.amountUSD,
      amountINR: coursePayment.amountINR,
      exchangeRate: coursePayment.exchangeRate,
      userName: currentUser?.email?.split('@')[0] || 'User',
      userEmail: currentUser?.email || 'N/A',
      paymentDate: coursePayment.createdAt,
      transactionId: coursePayment.transactionId
    };
    
    setReceiptData(receipt);
    setShowReceipt(true);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'success': return 'status-success';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      default: return '';
    }
  };

  if (loading && !payments.length && !coursePayments.length) {
    return <div className="loading">Loading payments...</div>;
  }

  return (
    <div className="payments-page">
      <h1>Payment History</h1>

      {/* Tabs */}
      <div className="payment-tabs">
        <button 
          className={`tab-button ${activeTab === 'receipts' ? 'active' : ''}`}
          onClick={() => setActiveTab('receipts')}
        >
          <FaReceipt style={{ marginRight: '8px' }} />
          Payment Receipts
        </button>
        <button 
          className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Course Payments
        </button>
        <button 
          className={`tab-button ${activeTab === 'other' ? 'active' : ''}`}
          onClick={() => setActiveTab('other')}
        >
          Other Payments
        </button>
      </div>

      {/* Uploaded Receipts Tab */}
      {activeTab === 'receipts' && (
        <>
          {receiptsLoading ? (
            <div className="loading">Loading receipts...</div>
          ) : uploadedReceipts.length === 0 ? (
            <div className="empty-state">
              <FaReceipt style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }} />
              <p>No payment receipts uploaded yet</p>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>
                Receipts uploaded by admin will appear here
              </p>
            </div>
          ) : (
            <>
              <div className="payments-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedReceipts.map((receipt) => (
                      <tr key={receipt._id}>
                        <td>{new Date(receipt.paymentDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</td>
                        <td>
                          {receipt.amount ? `₹${receipt.amount.toFixed(2)}` : '-'}
                        </td>
                        <td className="capitalize">
                          {receipt.paymentMethod?.replace('_', ' ') || '-'}
                        </td>
                        <td>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            receipt.fileType === 'pdf' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {receipt.fileType === 'pdf' ? <FaFilePdf style={{ marginRight: '4px' }} /> : <FaImage style={{ marginRight: '4px' }} />}
                            {receipt.fileType.toUpperCase()}
                          </span>
                        </td>
                        <td className="max-w-xs truncate">
                          {receipt.description || receipt.notes || '-'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => viewReceiptDetails(receipt)}
                              className="btn-view"
                              title="View"
                            >
                              <FaEye /> View
                            </button>
                            <button
                              onClick={() => downloadFile(receipt.receiptUrl, `receipt-${receipt._id}`)}
                              className="btn-download-small"
                              title="Download"
                            >
                              <FaDownload />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {receiptsPagination.pages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => {
                      setReceiptsPagination({ ...receiptsPagination, page: receiptsPagination.page - 1 });
                      fetchUploadedReceipts();
                    }}
                    disabled={receiptsPagination.page === 1}
                  >
                    Previous
                  </button>
                  <span>Page {receiptsPagination.page} of {receiptsPagination.pages}</span>
                  <button 
                    onClick={() => {
                      setReceiptsPagination({ ...receiptsPagination, page: receiptsPagination.page + 1 });
                      fetchUploadedReceipts();
                    }}
                    disabled={receiptsPagination.page === receiptsPagination.pages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Course Payments Tab */}
      {activeTab === 'courses' && (
        <>
          {coursePayments.length === 0 ? (
            <div className="empty-state">
              <p>No course payment records found</p>
            </div>
          ) : (
            <div className="payments-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Course</th>
                    <th>Type</th>
                    <th>Amount (USD)</th>
                    <th>Amount (INR)</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coursePayments.map((payment) => (
                    <tr key={payment._id}>
                      <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                      <td className="course-title">{payment.courseTitle}</td>
                      <td>
                        <span className="course-type-badge">
                          {payment.courseType}
                        </span>
                      </td>
                      <td>${payment.amountUSD.toFixed(2)}</td>
                      <td>₹{payment.amountINR.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="transaction-id">{payment.transactionId}</td>
                      <td>
                        <button 
                          onClick={() => viewCourseReceipt(payment)}
                          className="btn-receipt"
                          disabled={payment.status !== 'success'}
                        >
                          📄 Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Other Payments Tab */}
      {activeTab === 'other' && (
        <>
          {payments.length === 0 ? (
            <div className="empty-state">
              <p>No payment records found</p>
            </div>
          ) : (
            <>
              <div className="payments-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Purpose</th>
                      <th>Status</th>
                      <th>Transaction ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment._id}>
                        <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                        <td>₹{payment.amount.toFixed(2)}</td>
                        <td className="capitalize">{payment.purpose}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="transaction-id">{payment.transactionId}</td>
                        <td>
                          <button 
                            onClick={() => viewDetails(payment._id)}
                            className="btn-view"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span>Page {page} of {totalPages}</span>
                  <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Other Payment Details Modal */}
      {selectedPayment && (
        <div className="modal-overlay" onClick={() => setSelectedPayment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPayment(null)}>×</button>
            <h2>Payment Details</h2>
            <div className="payment-details">
              <div className="detail-row">
                <span className="label">Transaction ID:</span>
                <span className="value">{selectedPayment.transactionId}</span>
              </div>
              <div className="detail-row">
                <span className="label">Amount:</span>
                <span className="value">₹{selectedPayment.amount.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Purpose:</span>
                <span className="value capitalize">{selectedPayment.purpose}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`value status-badge ${getStatusClass(selectedPayment.status)}`}>
                  {selectedPayment.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">
                  {new Date(selectedPayment.createdAt).toLocaleString()}
                </span>
              </div>
              {selectedPayment.paymentMethod && (
                <div className="detail-row">
                  <span className="label">Payment Method:</span>
                  <span className="value">{selectedPayment.paymentMethod}</span>
                </div>
              )}
              {selectedPayment.invoiceUrl && (
                <div className="detail-row">
                  <a 
                    href={selectedPayment.invoiceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-download"
                  >
                    Download Invoice
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Course Payment Receipt Modal */}
      {showReceipt && receiptData && (
        <PaymentReceipt
          paymentData={receiptData}
          onClose={() => setShowReceipt(false)}
        />
      )}

      {/* Uploaded Receipt Viewer Modal */}
      {imageModalOpen && selectedReceipt && (
        <div 
          className="modal-overlay"
          onClick={closeReceiptModal}
          style={{ zIndex: 2000 }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '900px', maxHeight: '90vh', overflow: 'auto' }}
          >
            <button className="modal-close" onClick={closeReceiptModal}>×</button>
            
            <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaReceipt />
              Payment Receipt Details
            </h2>

            {/* Receipt Metadata */}
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {selectedReceipt.amount && (
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Amount</p>
                    <p style={{ fontWeight: '600', fontSize: '18px', color: '#059669' }}>
                      ₹{selectedReceipt.amount.toFixed(2)}
                    </p>
                  </div>
                )}
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Payment Date</p>
                  <p style={{ fontWeight: '500' }}>
                    {new Date(selectedReceipt.paymentDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                {selectedReceipt.paymentMethod && (
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Payment Method</p>
                    <p style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                      {selectedReceipt.paymentMethod.replace('_', ' ')}
                    </p>
                  </div>
                )}
                {selectedReceipt.description && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Description</p>
                    <p>{selectedReceipt.description}</p>
                  </div>
                )}
                {selectedReceipt.notes && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Notes</p>
                    <p>{selectedReceipt.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Receipt Image/PDF */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {selectedReceipt.fileType === 'pdf' ? (
                <iframe
                  src={selectedReceipt.receiptUrl}
                  style={{ width: '100%', height: '600px', border: 'none' }}
                  title="Receipt PDF"
                />
              ) : (
                <img
                  src={selectedReceipt.receiptUrl}
                  alt="Receipt"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}
            </div>

            {/* Download Button */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => downloadFile(selectedReceipt.receiptUrl, `receipt-${selectedReceipt._id}`)}
                className="btn-download"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <FaDownload /> Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .payments-page {
          padding: 20px;
        }

        .payment-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }

        .tab-button {
          padding: 12px 24px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.3s;
        }

        .tab-button:hover {
          color: #059669;
        }

        .tab-button.active {
          color: #059669;
          border-bottom-color: #059669;
        }

        .course-title {
          max-width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .course-type-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .btn-receipt {
          padding: 6px 16px;
          background: #059669;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
        }

        .btn-receipt:hover:not(:disabled) {
          background: #047857;
        }

        .btn-receipt:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }

        .payments-table {
          overflow-x: auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: #f9fafb;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
        }

        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }

        tr:hover {
          background: #f9fafb;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-success {
          background: #d1fae5;
          color: #065f46;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-failed {
          background: #fee2e2;
          color: #991b1b;
        }

        .transaction-id {
          font-family: monospace;
          font-size: 12px;
          color: #6b7280;
        }

        .capitalize {
          text-transform: capitalize;
        }

        .btn-view {
          padding: 6px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-view:hover {
          background: #2563eb;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }

        .pagination button {
          padding: 8px 16px;
          background: #059669;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .pagination button:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
        }

        .payment-details {
          margin-top: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-row .label {
          font-weight: 500;
          color: #6b7280;
        }

        .detail-row .value {
          color: #111827;
        }

        .btn-download {
          display: inline-block;
          padding: 10px 20px;
          background: #059669;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          margin-top: 10px;
        }

        .btn-download:hover {
          background: #047857;
        }

        .btn-download-small {
          padding: 6px 10px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          transition: background 0.3s;
        }

        .btn-download-small:hover {
          background: #2563eb;
        }

        .max-w-xs {
          max-width: 20rem;
        }

        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .inline-flex {
          display: inline-flex;
        }

        .items-center {
          align-items: center;
        }

        .bg-red-100 {
          background-color: #fee2e2;
        }

        .text-red-800 {
          color: #991b1b;
        }

        .bg-blue-100 {
          background-color: #dbeafe;
        }

        .text-blue-800 {
          color: #1e40af;
        }
      `}</style>
    </div>
  );
}

export default Payments;
