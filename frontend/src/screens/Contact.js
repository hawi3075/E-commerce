import React from 'react';

const Contact = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '120px', paddingBottom: '60px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.05em', marginBottom: '10px' }}>
            GET IN <span style={{ color: '#2563eb' }}>TOUCH</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>
            Technical support for LUU SAFETY equipment and AuraSync protocols.
          </p>
        </div>

        {/* Support Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          {/* Contact Details */}
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#2563eb', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: '900', marginBottom: '20px' }}>Support Channels</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>ASTU Campus Office</p>
              <p style={{ color: '#64748b', margin: '0' }}>Adama, Ethiopia</p>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Email Support</p>
              <p style={{ color: '#2563eb', margin: '0', fontWeight: '600' }}>support@aurasync.astu.edu</p>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '20px' }}>
              <p style={{ margin: '0', fontSize: '0.85rem', color: '#475569', fontStyle: 'italic' }}>
                "Engineered for reliability. We respond to all technical queries within 24 hours."
              </p>
            </div>
          </div>

          {/* Quick Message Form */}
          <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '30px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '800', marginBottom: '25px' }}>Quick Inquiry</h3>
            <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '15px', border: 'none', backgroundColor: '#334155', color: 'white', outline: 'none' }} />
            <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '15px', border: 'none', backgroundColor: '#334155', color: 'white', outline: 'none' }} />
            <textarea placeholder="Message" rows="4" style={{ width: '100%', padding: '15px', marginBottom: '20px', borderRadius: '15px', border: 'none', backgroundColor: '#334155', color: 'white', outline: 'none', resize: 'none' }}></textarea>
            <button style={{ width: '100%', padding: '15px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', transition: '0.3s' }}>
              SEND TERMINAL MESSAGE
            </button>
          </div>

        </div>

        <p style={{ textAlign: 'center', marginTop: '60px', color: '#cbd5e1', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
          AuraSync Protocol © 2026
        </p>
      </div>
    </div>
  );
};

export default Contact;