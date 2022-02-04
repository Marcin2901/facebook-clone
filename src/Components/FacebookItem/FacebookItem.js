import React from 'react';
import "./FacebookItem.css";

function FacebookItem(props) {

  const {img, text, size, icon, alternativeText} = props  

  

  return (
      <div className={`item ${size==="small" ? "item--small" : "item--normal"}`}>
          {img && <img src={img} /> }
          {icon && icon}
          <div className='with-alternative-text'>
               <h4 className='item--text'>{text}</h4>
               {alternativeText && alternativeText}
          </div>
      </div>
  )
}

export default FacebookItem;


// przypomnij sobie jak ustawić domyślne wartości dla size z propsów