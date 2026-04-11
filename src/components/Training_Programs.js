
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicTrainingPrograms } from '../services/api';
import { getUSDtoINRRate, convertUSDtoPaise } from '../utils/currencyConverter';
import PaymentReceipt from './PaymentReceipt';

const resolveText = (val) => typeof val === 'string' ? val : (val?.en || '');

export default function Training_Programs() {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('online');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(92.74); // Default fallback rate (1 USD = 92.74 INR)

  // Check if user is logged in
  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
  const userData = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;
  const isUserLoggedIn = !!userToken;
  const currentUser = userData ? JSON.parse(userData) : null;

  // Fetch exchange rate on component mount
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const rate = await getUSDtoINRRate();
        setExchangeRate(rate);
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        // Will use fallback rate of 83
      }
    };
    fetchRate();
  }, []);

  // Check if Razorpay script is loaded
  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
    } else {
      const checkRazorpay = setInterval(() => {
        if (window.Razorpay) {
          setRazorpayLoaded(true);
          clearInterval(checkRazorpay);
        }
      }, 100);
      
      return () => clearInterval(checkRazorpay);
    }
  }, []);

  // Fetch training programs from backend
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getPublicTrainingPrograms();
        if (!isMounted) return;
        setPrograms(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError('Unable to load training programs right now.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Map backend data into the structure expected by the UI
  const mappedPrograms = useMemo(() => {
    return programs.map((p, idx) => ({
      id: p._id || idx,
      title: resolveText(p.title) || 'Untitled Program',
      category: p.category || 'General',
      duration: p.duration || p.schedule || 'N/A',
      fees: p.price ? `$${p.price}` : (p.tuition || p.fee ? `$${p.tuition || p.fee}` : 'N/A'),
      inPerson: p.type === 'In-Person',
      description: resolveText(p.description || p.overview) || 'Details coming soon.',
      modules: Array.isArray(p.syllabus)
        ? p.syllabus.map((s, i) => ({
            title: resolveText(s.title || s.topic) || `Module ${i + 1}`,
            duration: s.duration || '',
            description: resolveText(s.description || s.details || s.content || '') || s.duration || ''
          }))
        : []
    }));
  }, [programs]);

  // Simple header to switch between pages
  const Header = () => (
    <div className="bg-[#f8f5f2] p-4 shadow-lg border-b-amber-950">
      <div className="max-w-7xl mx-auto flex justify-center space-x-8">
        <button 
          onClick={() => setCurrentPage('online')} 
          className={`relative px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out ${
            currentPage === 'online' 
              ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-md' 
              : 'text-amber-900 bg-white hover:bg-amber-100 shadow-sm hover:shadow-md'
          }`}
        >
          {currentPage === 'online' && (
            <span className="absolute -top-2 -right-2 h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-600"></span>
            </span>
          )}
          Online Courses
        </button>
        
        <button 
          onClick={() => setCurrentPage('in-person')} 
          className={`relative px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out ${
            currentPage === 'in-person' 
              ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-md' 
              : 'text-amber-900 bg-white hover:bg-amber-100 shadow-sm hover:shadow-md'
          }`}
        >
          {currentPage === 'in-person' && (
            <span className="absolute -top-2 -right-2 h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-600"></span>
            </span>
          )}
          In-Person Courses
        </button>
      </div>
    </div>
  );

  // CourseCard Component
  const CourseCard = ({ course }) => {
    const [expanded, setExpanded] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    
    const handleBuyNow = async () => {
      // Check if user is logged in
      if (!isUserLoggedIn) {
        const confirmLogin = window.confirm(
          'You need to be logged in to purchase a course.\n\n' +
          'Would you like to login or register now?'
        );
        if (confirmLogin) {
          navigate('/login');
        }
        return;
      }

      if (!razorpayLoaded || !window.Razorpay) {
        alert('Payment system is loading. Please try again in a moment.');
        return;
      }

      if (processingPayment) {
        return; // Prevent multiple clicks
      }

      setProcessingPayment(true);

      try {
        // Parse the fee amount (remove any non-numeric characters except decimal point)
        const feeAmount = parseFloat(course.fees.replace(/[^0-9.]/g, ''));
        
        if (isNaN(feeAmount) || feeAmount <= 0) {
          alert('Invalid course fee. Please contact support.');
          setProcessingPayment(false);
          return;
        }

        // Convert USD to INR paise using real-time exchange rate
        const amountInPaise = await convertUSDtoPaise(feeAmount, exchangeRate);
        const amountInINR = amountInPaise / 100;

        console.log(`Converting $${feeAmount} USD to ₹${amountInINR} INR (Rate: ${exchangeRate})`);

        const options = {
          key: 'rzp_test_SZIZZPucizQhdn',
          amount: amountInPaise,
          currency: 'INR',
          name: 'Bhagirathi Ayurveda',
          description: course.title,
          handler: function (response) {
            setProcessingPayment(false);
            
            // Prepare receipt data
            const receipt = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id || null,
              courseTitle: course.title,
              courseType: course.inPerson ? 'In-Person' : 'Online',
              amountUSD: feeAmount,
              amountINR: amountInINR,
              exchangeRate: exchangeRate,
              userName: currentUser?.email?.split('@')[0] || 'User',
              userEmail: currentUser?.email || 'N/A',
              paymentDate: new Date().toISOString(),
              transactionId: `TXN${Date.now()}`
            };
            
            setReceiptData(receipt);
            setShowReceipt(true);
            
            // TODO: Send payment details to backend for verification and storage
            // fetch('/api/payments/verify', {
            //   method: 'POST',
            //   headers: { 
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${userToken}`
            //   },
            //   body: JSON.stringify({
            //     razorpay_payment_id: response.razorpay_payment_id,
            //     razorpay_order_id: response.razorpay_order_id,
            //     razorpay_signature: response.razorpay_signature,
            //     course_id: course.id,
            //     amount_usd: feeAmount,
            //     amount_inr: amountInINR,
            //     exchange_rate: exchangeRate
            //   })
            // });
          },
          prefill: {
            name: currentUser?.email?.split('@')[0] || '',
            email: currentUser?.email || '',
            contact: ''
          },
          notes: {
            course_id: course.id,
            course_title: course.title,
            course_type: course.inPerson ? 'In-Person' : 'Online',
            amount_usd: feeAmount.toString(),
            amount_inr: amountInINR.toFixed(2),
            exchange_rate: exchangeRate.toFixed(2),
            user_email: currentUser?.email || ''
          },
          theme: {
            color: '#059669'
          },
          modal: {
            ondismiss: function() {
              setProcessingPayment(false);
              console.log('Payment cancelled by user');
            },
            escape: true,
            backdropclose: false
          }
        };

        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (response) {
          setProcessingPayment(false);
          const errorMsg = response.error?.description || response.error?.reason || 'Payment failed. Please try again.';
          alert(
            `❌ Payment Failed\n\n` +
            `${errorMsg}\n\n` +
            `Error Code: ${response.error?.code || 'Unknown'}\n` +
            `Please try again or contact support.`
          );
          console.error('Payment Error:', response.error);
        });
        
        rzp.open();
      } catch (error) {
        setProcessingPayment(false);
        console.error('Payment initialization error:', error);
        alert('Unable to initialize payment. Please check your internet connection and try again.');
      }
    };
    
    return (
      <>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 hover:border-[#8a6e4b] transition-all duration-300">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-amber-900">{course.title}</h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {course.category}
              </span>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center text-sm text-amber-800">
                <span className="mr-1">⏱</span>
                {course.duration}
              </div>
              <div className="flex items-center text-sm text-amber-800">
                <span className="mr-1">$</span>
                {course.fees}
              </div>
              {course.inPerson && (
                <div className="flex items-center text-sm text-amber-800">
                  <span className="mr-1">📍</span>
                  In-Person
                </div>
              )}
            </div>
            
            <p className="mt-3 text-amber-800">{course.description}</p>
            
            <button 
              onClick={() => setExpanded(!expanded)}
              className="mt-4 flex items-center text-emerald-700 font-medium"
            >
              {expanded ? 'Show Less' : 'View Modules'}
            </button>
            
            {expanded && (
              <div className="mt-4 pt-4 border-t border-amber-100">
                <h4 className="font-semibold text-amber-900 mb-2">Course Modules</h4>
                <ul className="mt-2 space-y-3">
                  {course.modules.map((module, idx) => (
                    <li key={idx} className="text-amber-800">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-emerald-700">{module.title}</span>
                        {module.duration && (
                          <span className="text-sm text-amber-600 ml-2 whitespace-nowrap">({module.duration})</span>
                        )}
                      </div>
                      {module.description && module.description !== module.duration && (
                        <div className="whitespace-pre-line mt-1 text-sm">{module.description}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Buy Now Button - Bottom Right */}
            <div className="mt-6 flex flex-col items-end gap-2">
              {/* Login prompt for non-logged-in users */}
              {!isUserLoggedIn && (
                <div className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded">
                  🔒 Login required to purchase
                </div>
              )}
              
              {/* Exchange rate info */}
              <div className="text-xs text-amber-600">
                ≈ ₹{(parseFloat(course.fees.replace(/[^0-9.]/g, '')) * exchangeRate).toFixed(2)} INR
                <span className="ml-1 text-amber-500">(1 USD = ₹{exchangeRate.toFixed(2)})</span>
              </div>
              <button
                onClick={handleBuyNow}
                disabled={processingPayment}
                className={`${
                  processingPayment 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700'
                } text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2`}
              >
                {processingPayment ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Buy Now</span>
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Receipt Modal */}
        {showReceipt && receiptData && (
          <PaymentReceipt
            paymentData={receiptData}
            onClose={() => setShowReceipt(false)}
          />
        )}
      </>
    );
  };

  // Online Courses Page
  const OnlineCourses = () => {
    const apiCourses = mappedPrograms.filter((c) => !c.inPerson);
    const onlineCourses = apiCourses;

    return (
      <div className="bg-[#f8f5f2] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Online Courses</h1>

          {/* Changed to single column layout */}
          <div className="grid grid-cols-1 gap-8">
            {onlineCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // InPersonCourses Component
  const InPersonCourses = () => {
    const apiCourses = mappedPrograms.filter((c) => c.inPerson);
    const inPersonCourses = apiCourses;

    return (
      <div className="bg-[#f8f5f2] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">In-Person Courses</h1>

          {/* Changed to single column layout */}
          <div className="grid grid-cols-1 gap-8">
            {inPersonCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Main App Render
  return (
    <div>
      {/* New Elegant Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f8f5f2] z-0">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-multiply"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-15 relative z-10 flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="max-w-2xl border-3 border-[#e5e0d6] rounded-lg p-6 w-full md:w-auto">
            <div className="mb-6 md:mb-8">
              <span className="text-[#8a6e4b] font-medium tracking-wider pl-1 text-sm md:text-base">Welcome to</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#2a2118] leading-tight mt-3 md:mt-4 mb-4 md:mb-6">
                  Bhagirathi Ayurveda Panchakarma Clinic &amp; Research Centre
              </h1>
              <div className="w-16 md:w-20 h-0.5 bg-[#8a6e4b] my-4 md:my-6"></div>
              <p className="text-base md:text-lg text-[#5a5248] font-light">"Where Ancient Wisdom Meets Modern Healing"</p>
            </div>
          </div>
          <div className="md:ml-12 lg:ml-30 mt-8 md:mt-30 self-center md:self-auto"> 
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#3a2f1d] leading-tight mt-0 md:mt-4 mb-4 md:mb-6 relative inline-block">
              <span className="relative z-10">
                Training Programs
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            </div>
          )}
          {error && (
            <div className="max-w-5xl mx-auto my-4 px-4">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            </div>
          )}
          {currentPage === 'online' && <OnlineCourses />}
          {currentPage === 'in-person' && <InPersonCourses />}
        </main>
      </div>
    </div>
  );
}