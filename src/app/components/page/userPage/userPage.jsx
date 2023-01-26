import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push("/users/" + userId + "/edit");
    };
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Проффесия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>CompletedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick} className="btn btn-secondary">Редактировать пользователя
                </button>
            </div>
        );
    } else {
        return <h2>Loading...</h2>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
