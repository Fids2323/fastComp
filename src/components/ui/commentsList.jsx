import React from "react";
import Comments from "./comments";
import CommentsForm from "./commentsForm";
import { orderBy } from "lodash";
import { useComments } from "../../hooks/useComments";
const CommentsList = () => {
    const { createComment, comments, removeComment } = useComments();
    const handleDelete = (id) => {
        removeComment(id);
    };

    const handleSubmit = (data) => {
        createComment(data);
    };

    if (comments) {
        const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

        return (
            <>
                <div className="card mb-2">
                    {" "}
                    <div className="card-body ">
                        <CommentsForm onSubmit={handleSubmit} />
                    </div>
                </div>
                {comments && comments.length !== 0 && (
                    <div className="card mb-3">
                        <div className="card-body ">
                            <h2>Комментарии</h2>
                            <hr />
                            <Comments
                                onDelete={handleDelete}
                                comments={sortedComments}
                            />
                        </div>
                    </div>
                )}
            </>
        );
    }
    return "Загрузка...";
};

export default CommentsList;
