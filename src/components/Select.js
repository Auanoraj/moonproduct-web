import React from 'react';

const Select = (props) => {
	return(<div className="form-group">
			<label htmlFor={props.name}> {props.title} </label>
		    <select
		      id = {props.id}
		      name={props.name}
		      value={props.value}
		      onChange={props.handleChange}
		      className="form-control">
		      <option value="" disabled>{props.placeholder}</option>
		      {props.options.map(option => {
		        return (
		          <option
		            key={option.id}
		            value={option.value}
		            label={option.value}>{option.value}</option>
		        );
		      })}
		    </select>
  </div>)
}

export default Select;