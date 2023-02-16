import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api/index";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioFiels";
import UserProvider from "../../hooks/useUsers";

const EditUserPage = () => {
  const [user, setUser] = useState();
  const params = useParams();
  const { userId } = params;
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((usersData) => setUser(usersData));
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    api.users.update(userId, user);
    history.push("/users/" + userId);
  };

  const handleChange = (target) => {
    if (target.name === "profession") {
      const array = Object.values(professions);
      let index;
      for (let i = 0; i < array.length; i++) {
        if (array[i]._id === target.value) {
          index = i;
        }
      }
      const key = Object.keys(professions)[index];
      setUser((prevState) => ({
        ...prevState,
        [target.name]: professions[key]
      }));
    } else if (target.name === "qualities") {
      const newValue = target.value.map((item) => {
        const array = Object.values(qualities);
        let index;
        for (let i = 0; i < array.length; i++) {
          if (array[i]._id === item.value) {
            index = i;
          }
        }
        const key = Object.keys(qualities)[index];
        return qualities[key];
      });
      setUser((prevState) => ({
        ...prevState,
        [target.name]: newValue
      }));
    } else {
      setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
    }
  };
  const defaultQualities = () => {
    return user.qualities.map((qualitie) => ({
      label: qualitie.name,
      value: qualitie._id
    }));
  };
  const handleBackHistory = () => {
    history.goBack();
  };
  if (user && professions && qualities) {
    return (
      <>
        <UserProvider>
          <div className="container mt-5">
            <button className="btn btn-primary" onClick={handleBackHistory}>
              <i className="bi bi-arrow-left-short"></i> Назад
            </button>
            <div className="row">
              <div className="col-md-6 offset-md-3 p-5 shadow">
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="name"
                    type="text"
                    label="Имя"
                    value={user.name}
                    onChange={handleChange}
                    error=""
                  />
                  <TextField
                    name="email"
                    type="text"
                    label="Электронная почта"
                    value={user.email}
                    onChange={handleChange}
                    error=""
                  />

                  <SelectField
                    name="profession"
                    onChange={handleChange}
                    label="Профессия"
                    value={user.profession._id}
                    options={professions}
                    defaultOption="Выбрать..."
                    error=""
                  />
                  <RadioField
                    options={[
                      { name: "мужчина", value: "male" },
                      { name: "женщина", value: "female" },
                      { name: "другое", value: "other" }
                    ]}
                    onChange={handleChange}
                    name="sex"
                    value={user.sex}
                    label="Пол"
                  />
                  <MultiSelectField
                    onChange={handleChange}
                    options={qualities}
                    name="qualities"
                    label="Качества"
                    defaultValue={qualities && defaultQualities()}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mx-auto"
                  >
                    Изменить
                  </button>
                </form>
              </div>
            </div>
          </div>
        </UserProvider>
      </>
    );
  }
  return "Загрузка...";
};

export default EditUserPage;
