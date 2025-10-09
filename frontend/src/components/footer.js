import React, { useState } from 'react';
import { Link } from "react-router-dom";
import MyForm from './Offcanvas';

const Footer = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <footer className="bg-red-700 text-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="font-bold mb-2 border-b border-red-400 pb-1">Useful links</h5>
            <ul className="space-y-1">
              <li><Link className="text-red-200 hover:underline" to="/items/ctg/men">Men</Link></li>
              <li><Link className="text-red-200 hover:underline" to="/items/ctg/women">Women</Link></li>
              <li><Link className="text-red-200 hover:underline" to="/items/ctg/kids">Kids</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="text-4xl font-extrabold tracking-widest uppercase mb-2">savarna</div>
            <span className="text-xs text-red-300">Copyright © 2023</span>
          </div>
          <div className="w-full md:w-1/3">
            <h5 className="font-bold mb-2 border-b border-red-400 pb-1">Contact Us</h5>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={toggleShow}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-2"
                >
                  Write to us
                </button>
                {show && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
                      <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl font-bold"
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <h2 className="text-xl font-bold mb-2 text-red-700">Raise your query</h2>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.908299369667!2d78.47756977412315!3d24.866981344998877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979c97c19b9afd7%3A0x4c0ebc43eec4dcf0!2sSavarna%20Fashion%20House!5e0!3m2!1sen!2sin!4v1685263641895!5m2!1sen!2sin"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Savarna Fashion House Map"
                      ></iframe>
                      <MyForm />
                    </div>
                  </div>
                )}
              </li>
              <li className="text-red-200">9131646124</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
