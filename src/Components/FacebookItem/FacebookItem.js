import React from 'react';
import "./FacebookItem.css";

function FacebookItem(props) {

  const {img, text, size, icon, alternativeText} = props  

  return (
      <div className={`item ${(size==="small" && "item--small")} ${(size==="big" && "item--big")}`}>
          {img && <img src={img} alt="example"/> }
          {icon && icon}
          <div className='with-alternative-text'>
               <h4 className='item--text'>{text}</h4>
               {alternativeText && alternativeText}
          </div>
      </div>
  )
}

export default FacebookItem;