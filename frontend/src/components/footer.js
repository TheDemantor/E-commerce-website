import React, { useState } from 'react';
import { Link } from "react-router-dom";
import MyForm from './Offcanvas';

const Footer = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <footer className="bg-gradient-to-tr from-red-800 via-red-700 to-red-500 text-white pt-10 pb-6 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center">
          {/* Useful Links */}
          <div className="mb-8 md:mb-0 flex flex-col items-center justify-center">
            <h5 className="font-bold mb-4 text-lg border-b border-red-400 pb-2 flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 text-red-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              Useful Links
            </h5>
            <ul className="space-y-2">
              <li><Link className="text-red-100 hover:text-white transition-colors duration-200 flex items-center gap-2 justify-center" to="/items/ctg/men"><span>👔</span>Men</Link></li>
              <li><Link className="text-red-100 hover:text-white transition-colors duration-200 flex items-center gap-2 justify-center" to="/items/ctg/women"><span>👗</span>Women</Link></li>
              <li><Link className="text-red-100 hover:text-white transition-colors duration-200 flex items-center gap-2 justify-center" to="/items/ctg/kids"><span>🧒</span>Kids</Link></li>
            </ul>
          </div>
          {/* Brand Center */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <img src="/logo_svg.png" alt="Savarna Logo" className="w-10 h-10" />
              <span className="text-4xl font-extrabold tracking-widest uppercase">savarna</span>
            </div>
            <span className="text-xs text-red-200 tracking-wide mt-2">Copyright © 2023</span>
            <div className="flex gap-4 mt-4 justify-center">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors duration-200"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors duration-200"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12z" /></svg></a>
              <a href="mailto:info@savarna.com" className="hover:text-yellow-300 transition-colors duration-200"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 3 6.01V6h18zm-18 12V8.236l8.293 6.293a1 1 0 0 0 1.414 0L21 8.236V18H3z" /></svg></a>
            </div>
          </div>
          {/* Contact Us */}
          <div className="flex flex-col items-center justify-center">
            <h5 className="font-bold mb-4 text-lg border-b border-red-400 pb-2 flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 text-red-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12v1a4 4 0 0 1-4 4H8m8-5V7a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h4" /></svg>
              Contact Us
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={toggleShow}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200 font-semibold mx-auto block"
                >
                  Write to us
                </button>
                {show && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative text-center">
                      <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-2xl font-bold"
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <h2 className="text-2xl font-bold mb-4 text-red-700">Raise your query</h2>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.908299369667!2d78.47756977412315!3d24.866981344998877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979c97c19b9afd7%3A0x4c0ebc43eec4dcf0!2sSavarna%20Fashion%20House!5e0!3m2!1sen!2sin!4v1685263641895!5m2!1sen!2sin"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Savarna Fashion House Map"
                        className="rounded-lg mb-4"
                      ></iframe>
                      <MyForm />
                    </div>
                  </div>
                )}
              </li>
              <li className="text-red-100 flex items-center gap-2 text-lg font-medium justify-center"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm7 7h2m-1-1v2" /></svg>9131646124</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
