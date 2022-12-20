import React from "react";
import PropTypes from "prop-types";

export function LabelInput({
    label,
    type,
    name,
    id,
    value,
    onChange: cb,
    required,
}) {
    return (
        <div className="labelInput">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name || type}
                id={id}
                value={value}
                onChange={cb}
                required={required}
            />
        </div>
    );
}

LabelInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    id: PropTypes.string,
};
