import React from 'react';
import PropTypes from "prop-types";

function Input({ type, value, name, onChange }) {
    return <input type={type} name={name} value={value} onChange={onChange} />
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Input;