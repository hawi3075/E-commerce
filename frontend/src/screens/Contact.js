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

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', msg: 'All fields are required' });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      // 👉 connect this to your backend later
      await axios.post('/api/contact', form);

      setStatus({ type: 'success', msg: 'Message sent successfully!' });

      // reset form
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', msg: 'Failed to send message' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '120px', paddingBottom: '60px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#0f172a' }}>
            GET IN <span style={{ color: '#2563eb' }}>TOUCH</span>
          </h1>
          <p style={{ color: '#64748b' }}>
            Technical support for LUU SAFETY equipment and AuraSync protocols.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

          {/* LEFT INFO */}
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px' }}>
            <h3 style={{ color: '#2563eb' }}>Support Channels</h3>

            <p><strong>Location:</strong> Adama, Ethiopia</p>
            <p><strong>Email:</strong> support@aurasync.astu.edu</p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '30px' }}
          >
            <h3 style={{ color: 'white', marginBottom: '20px' }}>
              Quick Inquiry
            </h3>

            {/* STATUS MESSAGE */}
            {status && (
              <p style={{
                color: status.type === 'success' ? 'lightgreen' : 'salmon',
                marginBottom: '15px'
              }}>
                {status.msg}
              </p>
            )}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              style={inputStyle}
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
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '60px', color: '#94a3b8' }}>
          AuraSync Protocol © 2026
        </p>
      </div>
    </div>
  );
};

// REUSABLE STYLE
const inputStyle = {
  width: '100%',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '15px',
  border: 'none',
  backgroundColor: '#334155',
  color: 'white',
  outline: 'none'
};

export default Contact;