import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";
const Comments = ({ comments, onDelete }) => {
    return (
        <>
            {comments.map((comment) => (
                <Comment data={comment} onDelete={onDelete} key={comment._id} />
            ))}
        </>
    );
};

Comments.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};
export default Comments;
