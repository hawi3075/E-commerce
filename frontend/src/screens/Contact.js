import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
            GET IN <span className="text-blue-600">TOUCH</span>
          </h1>
          <p className="text-slate-500 font-medium">Have questions about our safety gear? We are here to help.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-slate-50 p-12 rounded-[3rem] border border-slate-100 shadow-2xl">
          {/* Contact Form */}
          <form className="space-y-6">
            <input type="text" placeholder="Your Name" className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all" />
            <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all" />
            <textarea placeholder="How can we help you?" rows="5" className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"></textarea>
            <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all uppercase tracking-widest">Send Message</button>
          </form>

          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-8 md:pl-12">
            <div>
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Location</h4>
              <p className="text-slate-900 font-bold">Adama Science & Technology University (ASTU)</p>
              <p className="text-slate-500">Adama, Ethiopia</p>
            </div>
            <div>
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Technical Support</h4>
              <p className="text-slate-900 font-bold">support@aurasync.com</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
               <p className="text-slate-400 text-sm font-medium italic">"Safety is not an option; it's a requirement."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;