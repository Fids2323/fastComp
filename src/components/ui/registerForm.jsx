import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioFiels";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../store/professions";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  });
  const [errors, setErrors] = useState({});
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const { singUp } = useAuth();
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = qualities.map((item) => ({
    label: item.name,
    value: item._id
  }));

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((i) => i.value) };
    try {
      await singUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      minLength: {
        message: "Имя должно содержать минимум 3 знака",
        value: 3
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isMail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Проль должен содержать минимум 1 заглавную букву"
      },
      isContainNumber: {
        message: "Проль должен содержать минимум 1 цифру"
      },
      minLength: {
        message: "Проль должен содержать минимум 8 знаков",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите свою профессию"
      }
    },
    licence: {
      isRequired: {
        message:
          "Необходимо принять условия пользования и согласиться на обработку персональных данных"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  if (qualitiesLoading && professionsLoading) {
    return "Загрузка...";
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        type="text"
        label="Имя"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
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
      <SelectField
        name="profession"
        onChange={handleChange}
        label="Профессия"
        value={data.profession}
        options={professions}
        defaultOption="Выбрать..."
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "мужчина", value: "male" },
          { name: "женщина", value: "female" },
          { name: "другое", value: "other" }
        ]}
        onChange={handleChange}
        name="sex"
        value={data.sex}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        onChange={handleChange}
        options={qualitiesList}
        name="qualities"
        label="Выберите ваши качества"
        defaultValue={data.qualities}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Принимаю <a>условия пользования</a> и даю согласие на обработку
        персональных данных в соответствии с <a>политикой конфиденциальности</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Регистрация
      </button>
    </form>
  );
};

export default RegisterForm;
