import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        onChange({ name, value: !value });
    };

    const getInputClasses = () => {
        return "form-check-label" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" value="" id={name} checked={value} onChange ={handleChange}
            />
            <label className={getInputClasses()} htmlFor={name}>
                {children}
            </label>
            {error && <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {error}
            </div>
            }
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CheckBoxField;
