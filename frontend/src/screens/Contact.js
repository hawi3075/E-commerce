import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success / error

  // REUSABLE INTERNAL STYLE
  const inputStyle = {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '15px',
    border: 'none',
    backgroundColor: '#334155',
    color: 'white',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', msg: 'All fields are required' });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      // Connects to your backend base URL configuration
      await axios.post('/api/contact', form);

      setStatus({ type: 'success', msg: 'Message sent successfully!' });

      // reset form
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to send message';
      setStatus({ type: 'error', msg: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '120px', paddingBottom: '60px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.05em' }}>
            GET IN <span style={{ color: '#2563eb' }}>TOUCH</span>
          </h1>
          <p style={{ color: '#64748b', marginTop: '10px', fontSize: '1.1rem' }}>
            Technical support for LUU SAFETY equipment and AuraSync protocols.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

          {/* LEFT INFO */}
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
            <h3 style={{ color: '#2563eb', fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>Support Channels</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#334155' }}>
              <p style={{ margin: 0 }}><strong style={{ color: '#0f172a' }}>Location:</strong> Adama, Ethiopia</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#0f172a' }}>Email:</strong> support@aurasync.astu.edu</p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          >
            <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.5rem', fontWeight: '700' }}>
              Quick Inquiry
            </h3>

            {/* STATUS MESSAGE */}
            {status && (
              <div style={{
                padding: '12px 15px',
                borderRadius: '12px',
                backgroundColor: status.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: status.type === 'success' ? '#4ade80' : '#f87171',
                marginBottom: '20px',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}>
                {status.msg}
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              style={{ ...inputStyle, resize: 'vertical' }}
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: loading ? '#64748b' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease',
                fontSize: '1rem'
              }}
            >
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '60px', color: '#94a3b8', fontSize: '0.9rem' }}>
          AuraSync Protocol © 2026
        </p>
      </div>
    </div>
  );
};

export default Contact;