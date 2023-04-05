import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import QualitiesCard from "../../ui/qualitiesCard";
import UserCard from "../../ui/userCard";
import MeetingsCard from "../../ui/meetingsCard";
import CommentsList from "../../ui/commentsList";
import CommentsProvider from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";
const UserPage = ({ userId }) => {
  const history = useHistory();

  const user = useSelector(getUserById(userId));
  const handleEditUser = () => {
    history.push("/users/" + userId + "/edit");
  };
  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} onChange={handleEditUser} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard number={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <CommentsProvider>
              <CommentsList />
            </CommentsProvider>
          </div>
        </div>
      </div>
    );
  }
  return "Загрузка...";
};
UserPage.propTypes = {
  userId: PropTypes.string
};
export default UserPage;
