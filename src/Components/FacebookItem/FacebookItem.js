import React from 'react';
import "./FacebookItem.css";

function FacebookItem(props) {

  const {img, text, size} = props  

  

  return (
      <div className={`item ${size==="small" ? "item--small" : "item--normal"}`}>
          <img src={img} />
          <h4 className='item--text'>{text}</h4>
      </div>
  )
}

export default FacebookItem;


// przypomnij sobie jak ustawić domyślne wartości dla size z propsów