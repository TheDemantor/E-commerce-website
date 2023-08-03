import { Alert } from "react-bootstrap";

import React from 'react'

const Message = ({variant, children}) => {
  return (
    <div><Alert variant={variant} >{children}</Alert></div>
  )
}

export default Message;