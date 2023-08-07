// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Form, Button } from "react-bootstrap";

// function MyForm() {
//   const [state, setState] = useState({
//     submitting: false,
//     status: null
//   });
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   // const [comment, setComment] = useState('');
//   const handleServerResponse = (ok, msg, form) => {
//     setState({
//       submitting: false,
//       status: { ok, msg }
//     });
//     if (ok) {
//       form.reset();
//     }
//     else {
//       console.log(msg)
//     }
//   };


//   const handleSubmit = e => {
//     e.preventDefault();
//     const form = e.target;
//     setState({ submitting: true });
//     axios({
//       method: "post",
//       url: "https://formspree.io/f/mnqyylzz",
//       data: new FormData(form)
//     })
//       .then(r => {
//         handleServerResponse(true, "Your response have been taken. We will get to you soon!", form);
//       })
//       .catch(r => {
//         handleServerResponse(false, r.response.data.error, form);
//       });
//   };
//   return (
//     <div>
//       <h3>Contact Us</h3>
//       <form onSubmit={handleOnSubmit}>
//         <label htmlFor="email">Email:</label>
//         <input id="email" type="email" name="email" required />
//         <label htmlFor="message">Message:</label>
//         <textarea id="message" name="message"></textarea>
//         <button type="submit" disabled={serverState.submitting}>
//           Submit
//         </button>
//         {serverState.status && (
//           <p className={!serverState.status.ok ? "errorMsg" : ""}>
//             {serverState.status.msg}
//           </p>
//         )}
//       </form> */}
//       <Form onSubmit={handleSubmit} className='text-left' id='contactForm'>
//         <Form.Group className='my-2' controlId='name'>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             ></Form.Control>
//         <Form.Group controlId='email' className='my-3'>
//           <Form.Label>Email Id</Form.Label>
//           <Form.Control
//             type='email'
//             name="email"
//             placeholder='Enter your email address.'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             ></Form.Control>
//         </Form.Group>
//         <Form.Group className='my-2' controlId='message'>
//           <Form.Label>Your message:</Form.Label>
//           <Form.Control
//             type='text-area'
//             name="message"
//             placeholder='write your concern, we will contact you shortly'
//           ></Form.Control>
//         </Form.Group>
//         <Button type='submit' disabled={serverStatesubmitting} variant='primary'>
//           Send
//         </Button>
//         {serverState.status && (
//           <p className={!serverState.status.ok ? "errorMsg" : ""}>
//             {serverState.status.msg}
//           </p>



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

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
    <div>
      <h1>Contact Us</h1>
      <Form onSubmit={handleOnSubmit} className="text-left">

        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>

        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control id="email" type="email" name="email" required />
        </Form.Group>

        <Form.Group>

        <Form.Label htmlFor="message">Message:</Form.Label>
        <Form.Control type="textarea" id="message" name="message"></Form.Control>
        </Form.Group>
        <Button type="submit" disabled={serverState.submitting} variant="primary">
          Submit
        </Button>
        {serverState.status && (
          <p className={!serverState.status.ok ? "errorMsg" : ""}>
            {serverState.status.msg}
          </p>
        )}
      </Form>
    </div>
  );
};

export default MyForm;