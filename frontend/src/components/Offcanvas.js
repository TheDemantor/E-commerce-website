import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function MyForm() {
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg }
    });
    if (ok) {
      form.reset();
    }
  };
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const handleOnSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: "post",
      url: "https://formspree.io/f/mnqyylzz",
      data: new FormData(form)
    })
      .then(r => {
        handleServerResponse(true, "Thanks! we will get to you soon", form);
      })
      .catch(r => {
        handleServerResponse(false, r.response.data.error, form);
      });
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleOnSubmit} className="space-y-4 text-left">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your concern, we will contact you shortly"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={serverState.submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Submit
        </button>
        {serverState.status && (
          <p className={`mt-2 ${!serverState.status.ok ? 'text-red-600' : 'text-green-600'}`}>
            {serverState.status.msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default MyForm;