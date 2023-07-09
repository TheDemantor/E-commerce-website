import { Alert } from "react-bootstrap";
import { useState } from 'react';

import React from 'react'

const Message = ({variant, children}) => {
  const [show, setShow] = useState(true);
  return (
    <div><Alert variant={variant} onClose={() => setShow(false)} >{children}</Alert></div>
    // <div><Alert variant={variant} onClose={() => setShow(false)} dismissible>{children}</Alert></div>
  )
}

export default Message