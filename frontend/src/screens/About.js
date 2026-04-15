import React from 'react';

const About = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '100px', paddingBottom: '50px', paddingLeft: '20px', paddingRight: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', borderRadius: '40px', padding: '50px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', color: '#0f172a', margin: '0 0 20px 0' }}>
          LUU<span style={{ color: '#2563eb' }}>SAFETY</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: '1.6', marginBottom: '30px' }}>
          Welcome to the <strong>AuraSync</strong> terminal. Developed at <strong>ASTU</strong>, we provide high-end 
          safety equipment for the modern industrial workforce. Our platform ensures that gear synchronization 
          is seamless and secure.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#eff6ff', padding: '20px', borderRadius: '20px' }}>
            <h3 style={{ margin: '0', color: '#1e40af' }}>Our Roots</h3>
            <p style={{ fontSize: '0.9rem', color: '#1e3a8a' }}>Adama Science & Technology University</p>
          </div>
          <div style={{ flex: 1, backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '20px' }}>
            <h3 style={{ margin: '0', color: '#334155' }}>Version</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>AuraSync V2.0 - E-Shop</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;