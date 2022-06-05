import React from 'react';
import classes from "./MySelect.module.css"
const MySelect = ({defaultValue,options , value , onChange}) => {
    return (
        <select
            className={ classes.MySelect}
            onChange={event => onChange(event.target.value)}
            value={value}
        >
            <option disabled={true} value="">{defaultValue}</option>
            {options.map(option =>
            <option key={option.value} value={option.value}>
                {option.name}
            </option> )}
        </select>
    );
};

export default MySelect;