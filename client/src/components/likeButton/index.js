import React, { useState } from 'react';
import Heart from "react-animated-heart";

export const likeButton = () => {
    const [isClick, setClick] = useState(false);
  return (
    <div className='like-btn'>
        <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
    </div>
  );
};