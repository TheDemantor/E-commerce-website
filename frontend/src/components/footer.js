import React from 'react'
import {Link} from "react-router-dom";

export default function footer() {
  return (
    <div className='footer'>
      <div className="ft-cl">
        <h6>
          Useful links
        </h6>
        <ul className='ft-cl-ul'>
          <li><Link className="ft-cl-it" to="/items">Men</Link></li>
          <li><Link className="ft-cl-it" to="/items">Women</Link></li>
          <li><hr className="dropdown-divider"></hr></li>
          <li><Link className="ft-cl-it" to="/items">Kids</Link></li>

        </ul>
      </div>
      <div className="ft-cl">
        <h6>
          Contact Us
        </h6>
      </div>
    </div>
  )
}
