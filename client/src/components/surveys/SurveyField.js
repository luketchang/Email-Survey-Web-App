//contains logic to render label and input field
import React from 'react';

export default ({ input, label, meta: {touched, error} }) => {
  return(
    <div>
      <label>{label}</label>
      <input style = {{marginBottom: '5px'}}{...input} />
      <div className="red-text" style={{marginBottom: '20px'}}>
        {touched && error}
      </div>
    </div>
  );
};
