import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    name,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  _id: options[optionName]._id
              }))
            : options;
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getSelectClasses = () => {
        return "form-select " + (error ? "is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                id="validationCustom04"
                value={value}
                onChange={handleChange}
                name={name}
                className={getSelectClasses()}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {options &&
                    optionsArray.map((option) => {
                        return (
                            <option value={option._id} key={option._id}>
                                {option.name}
                            </option>
                        );
                    })}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
};
export default SelectField;
