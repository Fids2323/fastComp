import React, { useState, useEffect } from "react";
import API from "../../api";
import { useParams } from "react-router-dom";
import Comments from "./comments";
import CommentsForm from "./commentsForm";
import { orderBy } from "lodash";
const CommentsList = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState();
  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleDelete = (id) => {
    API.comments
      .remove(id)
      .then((id) => setComments(comments.filter((item) => item._id !== id)));
  };

  const handleSubmit = (data) => {
    API.comments
      .add(data)
      .then((newComment) => setComments([...comments, newComment]));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  if (comments) {
    return (
      <>
        <div className="card mb-2">
          {" "}
          <div className="card-body ">
            <CommentsForm onSubmit={handleSubmit} userId={userId} />
          </div>
        </div>
        {comments && comments.length !== 0 && (
          <div className="card mb-3">
            <div className="card-body ">
              <h2>Комментарии</h2>
              <hr />
              <Comments onDelete={handleDelete} comments={sortedComments} />
            </div>
          </div>
        )}
      </>
    );
  }
  return "Загрузка...";
};

export default CommentsList;
