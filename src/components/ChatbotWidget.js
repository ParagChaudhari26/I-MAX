import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import { chatApi } from '../services/api';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controls CSS transition
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Namaste! I am your Ayurveda assistant. How can I help you today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    if (isOpen) {
      setIsVisible(false);
      setTimeout(() => setIsOpen(false), 280); // wait for CSS transition
    } else {
      setIsOpen(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = { id: Date.now(), type: 'user', text: inputMessage.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(userMsg.text);
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: typeof response === 'string' ? response : (response?.data || 'I received your message.'),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: t('chatbot.error'),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat window — mounted but CSS-animated */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '6rem',
            right: '1.5rem',
            zIndex: 50,
            width: '22rem',
            height: '30rem',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
            border: '1px solid #f3f4f6',
            background: '#fff',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            transition: 'opacity 0.28s ease, transform 0.28s ease',
          }}
        >
          {/* Header */}
          <div style={{ background: '#059669', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaRobot size={18} />
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Ayurveda Assistant</span>
            </div>
            <button
              onClick={toggleChat}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', lineHeight: 0 }}
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  maxWidth: '85%',
                  alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <div style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                  background: msg.type === 'user' ? '#7c3aed' : '#059669',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                }}>
                  {msg.type === 'user' ? <FaUser size={11} /> : <FaRobot size={11} />}
                </div>
                <div style={{
                  padding: '0.6rem 0.9rem',
                  borderRadius: msg.type === 'user' ? '1rem 0.25rem 1rem 1rem' : '0.25rem 1rem 1rem 1rem',
                  background: msg.type === 'user' ? '#7c3aed' : msg.isError ? '#fef2f2' : '#fff',
                  color: msg.type === 'user' ? '#fff' : msg.isError ? '#991b1b' : '#1f2937',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  border: msg.isError ? '1px solid #fecaca' : msg.type === 'bot' ? '1px solid #f3f4f6' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <FaRobot size={11} />
                </div>
                <div style={{ padding: '0.7rem 1rem', background: '#fff', borderRadius: '0.25rem 1rem 1rem 1rem', border: '1px solid #f3f4f6', display: 'flex', gap: 4 }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      style={{
                        width: 7, height: 7, borderRadius: '50%', background: '#059669', display: 'inline-block',
                        animation: `chatbotBounce 0.8s ${delay}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem', background: '#fff', borderTop: '1px solid #f3f4f6', flexShrink: 0 }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                style={{
                  flex: 1, fontSize: '0.82rem', border: '1px solid #e5e7eb', borderRadius: '9999px',
                  padding: '0.5rem 1rem', outline: 'none', background: '#f9fafb',
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                style={{
                  width: 38, height: 38, borderRadius: '50%', background: '#059669', color: '#fff',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: isLoading || !inputMessage.trim() ? 0.5 : 1, flexShrink: 0,
                }}
              >
                <FaPaperPlane size={13} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        title="Chat with AI Assistant"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50,
          width: 52, height: 52, borderRadius: '50%', background: '#059669',
          color: '#fff', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(5,150,105,0.4)',
          transform: 'scale(1)', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 14px 28px rgba(5,150,105,0.5)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(5,150,105,0.4)'; }}
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={22} />}
      </button>

      <style>{`
        @keyframes chatbotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;
