import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioFiels";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";

const EditUserPage = () => {
    const { currentUser, updateUserData } = useAuth();
    const [user, setUser] = useState({
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        qualities: currentUser.qualities,
        sex: currentUser.sex
    });
    const params = useParams();
    const { userId } = params;
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const history = useHistory();

    useEffect(() => {
        if (userId !== currentUser.id) {
            history.replace(`/users/${currentUser._id}/edit`);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateUserData(user);
        history.push("/users/" + currentUser._id);
    };
    function transformData(array) {
        return array.map((i) => ({ label: i.name, value: i._id }));
    }

    const handleChange = (target) => {
        if (target.name === "qualities") {
            const newValue = target.value.map((i) => i.value);
            setUser((prevState) => ({ ...prevState, qualities: newValue }));
        } else {
            setUser((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };
    const handleBackHistory = () => {
        history.goBack();
    };
    if (currentUser && !professionsLoading && !qualitiesLoading) {
        const defaultQualities = () => {
            return currentUser.qualities.map((qualitie) => {
                const qualitieData = qualities.find((i) => i._id === qualitie);
                return {
                    label: qualitieData.name,
                    value: qualitieData._id
                };
            });
        };
        return (
            <>
                <div className="container mt-5">
                    <button
                        className="btn btn-primary"
                        onClick={handleBackHistory}
                    >
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
                                    value={user.profession}
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
                                    options={transformData(qualities)}
                                    name="qualities"
                                    label="Качества"
                                    defaultValue={
                                        qualities && defaultQualities()
                                    }
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
            </>
        );
    }
    return "Загрузка...";
};

export default EditUserPage;
