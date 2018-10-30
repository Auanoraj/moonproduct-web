import React from 'react';

const CheckBox = (props) => {
	return( <div className="form-group">
    <label htmlFor={props.name} className="form-label">{props.title}</label>
    <div className="checkbox">
      {props.options.map(option => {
        return (
          <label key={option.id} className="checkbox-inline">
            <input
              id={option.id}
              name={props.name}
              onChange={props.handleChange}
              value={option.value}
              checked={ props.selectedOptions.indexOf(option.value) > -1 }
              type="checkbox" />{option.value}
          </label>
        );
      })}
    </div>
  </div>
);

}

export default CheckBox;