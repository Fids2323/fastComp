import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextArea from "../common/form/textAreaField";
import { validator } from "../../utils/validator";

const CommentsForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Поле не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData({ content: "" });
        setErrors({});
    };

    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleFormSubmit} className="was-validated">
            <TextArea
                name="content"
                rows="3"
                cols="80"
                id="content"
                onChange={handleChange}
                value={data.content}
                error={errors.content}
            />
            <button
                className="btn btn-primary"
                type="submit"
                disabled={!isValid}
            >
                Отправить
            </button>
        </form>
    );
};
CommentsForm.propTypes = {
    onSubmit: PropTypes.func
};
export default CommentsForm;
