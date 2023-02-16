import React, { useState, useEffect } from "react";
import SelectField from "../common/form/selectField";
import PropTypes from "prop-types";
import TextArea from "../common/form/textAreaField";
import API from "../../api";
import { validator } from "../../utils/validator";

const CommentsForm = ({ onSubmit, userId }) => {
  const [data, setData] = useState({ pageId: userId, userId: "", content: "" });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState();
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберите пользователя"
      }
    },
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
    setData({ pageId: userId, userId: "", content: "" });
    setErrors({});
  };

  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;
  if (!users) {
    return "Загрузка...";
  }
  return (
    <form onSubmit={handleFormSubmit} className="was-validated">
      <SelectField
        name="userId"
        onChange={handleChange}
        label=""
        value={data.userId}
        options={users}
        defaultOption="Выберите пользователя"
        error={errors.userId}
      />
      <TextArea
        name="content"
        rows="3"
        cols="80"
        id="content"
        onChange={handleChange}
        value={data.content}
        error={errors.content}
      />
      <button className="btn btn-primary" type="submit" disabled={!isValid}>
        Отправить
      </button>
    </form>
  );
};
CommentsForm.propTypes = {
  onSubmit: PropTypes.func,
  userId: PropTypes.string
};
export default CommentsForm;
