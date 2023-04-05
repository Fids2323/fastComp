import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
// import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const { singIn } = useAuth();
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await singIn(data);

      history.push(
        history.location.state !== undefined
          ? history.location.state.from.pathname
          : "/"
      );
    } catch (error) {
      setErrors(error);
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      .matches(
        /^(?=.*[A-Z])/,
        "Проль должен содержать минимум 1 заглавную букву"
      )
      .matches(/(?=.*[0-9])/, "Проль должен содержать минимум 1 цифру")
      .matches(/(?=.{8,})/, "Проль должен содержать минимум 8 знаков"),
    email: yup
      .string()
      .required("Электронная почта обязательна для заполнения")
      .email("Email введен некорректно")
  });

  const validate = () => {
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        type="text"
        label="Электронная почта"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />

      <TextField
        name="password"
        type="password"
        label="Пароль"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
