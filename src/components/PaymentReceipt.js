import React from 'react';

/**
 * Professional Payment Receipt Component for Bhagirathi Ayurveda
 * Displays after successful payment with all transaction details
 */
const PaymentReceipt = ({ 
  paymentData, 
  onClose
}) => {
  const {
    paymentId,
    orderId,
    courseTitle,
    courseType,
    amountUSD,
    amountINR,
    exchangeRate,
    userName,
    userEmail,
    paymentDate,
    transactionId
  } = paymentData;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadPDF = async () => {
    try {
      // Dynamically import jspdf and jspdf-autotable
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      
      // Set colors
      const emeraldGreen = [5, 150, 105];
      const amberBrown = [217, 119, 6];
      const darkGray = [55, 65, 81];
      
      // Header
      doc.setFillColor(...emeraldGreen);
      doc.circle(105, 20, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('BA', 105, 22, { align: 'center' });
      
      doc.setTextColor(...amberBrown);
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('Bhagirathi Ayurveda', 105, 35, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text('Panchakarma Clinic & Research Centre', 105, 42, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text('"Where Ancient Wisdom Meets Modern Healing"', 105, 48, { align: 'center' });
      
      // Success badge
      doc.setFillColor(16, 185, 129);
      doc.circle(105, 60, 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text('✓', 105, 62, { align: 'center' });
      
      doc.setTextColor(16, 185, 129);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Payment Successful!', 105, 72, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Your enrollment has been confirmed', 105, 78, { align: 'center' });
      
      let yPos = 90;
      
      // Receipt Details Section
      doc.setFillColor(254, 243, 199);
      doc.rect(15, yPos, 180, 35, 'F');
      doc.setTextColor(...amberBrown);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('Receipt Details', 20, yPos + 7);
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...darkGray);
      doc.text('Receipt No:', 20, yPos + 15);
      doc.text(transactionId, 70, yPos + 15);
      doc.text('Payment ID:', 20, yPos + 21);
      doc.text(paymentId, 70, yPos + 21);
      if (orderId) {
        doc.text('Order ID:', 20, yPos + 27);
        doc.text(orderId, 70, yPos + 27);
      }
      doc.text('Date & Time:', 20, yPos + 33);
      doc.text(formatDate(paymentDate), 70, yPos + 33);
      
      yPos += 42;
      
      // Customer Details Section
      doc.setFillColor(209, 250, 229);
      doc.rect(15, yPos, 180, 20, 'F');
      doc.setTextColor(5, 150, 105);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('Customer Details', 20, yPos + 7);
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...darkGray);
      doc.text('Name:', 20, yPos + 13);
      doc.text(userName, 70, yPos + 13);
      doc.text('Email:', 20, yPos + 18);
      doc.text(userEmail, 70, yPos + 18);
      
      yPos += 27;
      
      // Course Details Section
      doc.setFillColor(219, 234, 254);
      doc.rect(15, yPos, 180, 20, 'F');
      doc.setTextColor(30, 64, 175);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('Course Details', 20, yPos + 7);
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...darkGray);
      doc.text('Course Name:', 20, yPos + 13);
      doc.text(courseTitle.substring(0, 50), 70, yPos + 13);
      doc.text('Course Type:', 20, yPos + 18);
      doc.text(courseType, 70, yPos + 18);
      
      yPos += 27;
      
      // Payment Summary Section
      doc.setFillColor(249, 250, 251);
      doc.rect(15, yPos, 180, 25, 'F');
      doc.setTextColor(...darkGray);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('Payment Summary', 20, yPos + 7);
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text('Course Fee (USD):', 20, yPos + 13);
      doc.text(`$${amountUSD.toFixed(2)}`, 70, yPos + 13);
      doc.text('Exchange Rate:', 20, yPos + 18);
      doc.text(`1 USD = ₹${exchangeRate.toFixed(2)}`, 70, yPos + 18);
      
      doc.setDrawColor(5, 150, 105);
      doc.setLineWidth(0.5);
      doc.line(20, yPos + 20, 190, yPos + 20);
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(5, 150, 105);
      doc.text('Total Paid (INR):', 20, yPos + 25);
      doc.text(`₹${amountINR.toFixed(2)}`, 70, yPos + 25);
      
      yPos += 32;
      
      // Important Notes
      doc.setFillColor(254, 243, 199);
      doc.rect(15, yPos, 180, 25, 'F');
      doc.setTextColor(146, 64, 14);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Important Notes:', 20, yPos + 6);
      
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text('• Please save this receipt for your records', 20, yPos + 11);
      doc.text('• Course access details will be sent to your email within 24 hours', 20, yPos + 15);
      doc.text('• For any queries, contact us with your Receipt No.', 20, yPos + 19);
      doc.text('• Refund policy applies as per terms and conditions', 20, yPos + 23);
      
      yPos += 32;
      
      // Footer
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('For support, contact us at:', 105, yPos, { align: 'center' });
      doc.setFont(undefined, 'bold');
      doc.text('support@bhagirathiayurveda.com', 105, yPos + 5, { align: 'center' });
      doc.setFont(undefined, 'normal');
      doc.text('Thank you for choosing Bhagirathi Ayurveda!', 105, yPos + 10, { align: 'center' });
      
      // Save PDF
      doc.save(`Bhagirathi-Ayurveda-Receipt-${transactionId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Receipt Content */}
        <div id="receipt-content" className="p-8">
          {/* Header with Logo and Clinic Name */}
          <div className="text-center border-b-2 border-emerald-600 pb-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">BA</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">
              Bhagirathi Ayurveda
            </h1>
            <p className="text-lg text-amber-700">
              Panchakarma Clinic & Research Centre
            </p>
            <p className="text-sm text-amber-600 mt-2">
              "Where Ancient Wisdom Meets Modern Healing"
            </p>
          </div>

          {/* Success Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-1">Payment Successful!</h2>
            <p className="text-gray-600">Your enrollment has been confirmed</p>
          </div>

          {/* Receipt Details */}
          <div className="bg-amber-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 border-b border-amber-200 pb-2">
              Receipt Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Receipt No:</span>
                <span className="font-semibold text-gray-900">{transactionId || paymentId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-mono text-sm text-gray-900">{paymentId}</span>
              </div>
              
              {orderId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-sm text-gray-900">{orderId}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-semibold text-gray-900">{formatDate(paymentDate)}</span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-emerald-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4 border-b border-emerald-200 pb-2">
              Customer Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold text-gray-900">{userName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{userEmail}</span>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 border-b border-blue-200 pb-2">
              Course Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Course Name:</span>
                <span className="font-semibold text-gray-900 text-right">{courseTitle}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Course Type:</span>
                <span className="font-semibold text-gray-900">{courseType}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Payment Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Course Fee (USD):</span>
                <span className="font-semibold text-gray-900">${amountUSD.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Exchange Rate:</span>
                <span className="text-gray-900">1 USD = ₹{exchangeRate.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between pt-3 border-t-2 border-gray-300">
                <span className="text-lg font-bold text-gray-900">Total Paid (INR):</span>
                <span className="text-lg font-bold text-emerald-600">₹{amountINR.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>Please save this receipt for your records</li>
              <li>Course access details will be sent to your email within 24 hours</li>
              <li>For any queries, contact us with your Receipt No.</li>
              <li>Refund policy applies as per terms and conditions</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center text-sm text-gray-600 border-t pt-4">
            <p className="mb-1">For support, contact us at:</p>
            <p className="font-semibold text-gray-900">support@bhagirathiayurveda.com</p>
            <p className="mt-2">Thank you for choosing Bhagirathi Ayurveda!</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-8 py-4 border-t flex justify-between items-center print:hidden">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
          
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentReceipt;
