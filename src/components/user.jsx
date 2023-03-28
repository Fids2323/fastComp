import React from "react";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    _id,
    bookmark,
    onFavorite,
    onDelete
}) => {
    return (
        <tr scope="row">
            <td>
                <Link to={"/users/" + _id}>{name}</Link>
            </td>
            <td>
                <ul>
                    {qualities.map((quality) => (
                        <Qualitie key={quality._id} {...quality} />
                    ))}
                </ul>
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} / 5</td>
            <td>
                <Bookmark
                    userId={_id}
                    bookmark={bookmark}
                    onFavourite={onFavorite}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onFavorite: PropTypes.func,
    onDelete: PropTypes.func
};

export default User;
