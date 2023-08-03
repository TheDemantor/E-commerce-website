import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
const rating = ({ rating, text }) => {
    let value=rating;
    return (
    <div className='rating'>
        <span>
            {value>=1? <FaStar/> : value>=0.5 ? <FaStarHalfAlt/>:<FaRegStar/> }


        </span>
        <span>
            {value>=2? <FaStar/> : value>=1.5 ? <FaStarHalfAlt/>:<FaRegStar/> }


        </span>
        <span>
            {value>=3? <FaStar/> : value>=2.5 ? <FaStarHalfAlt/>:<FaRegStar/> }


        </span>
        <span>
            {value>=4? <FaStar/> : value>=3.5 ? <FaStarHalfAlt/>:<FaRegStar/> }


        </span>
        <span>
            {value>=5? <FaStar/> : value>=4.5 ? <FaStarHalfAlt/>:<FaRegStar/> }

        </span>
            {(text)&& <span> {`${text} reviews`} </span>
        
        }
    </div>
  )
}

export default rating