import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div>
            <textarea
                type="text"
                name={name}
                rows="3"
                id={name}
                onChange={handleChange}
                value={value}
                className="form-control mb-2"
                required
            ></textarea>
            {error && <div className="invalid-feedback mb-4">{error}</div>}
        </div>
    );
};
TextAreaField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextAreaField;
