import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ userId, bookmark, onFavourite }) => {
  return (
    <button
      className="btn btn-outline-dark"
      onClick={() => onFavourite(userId)}
    >
      { bookmark
        ? (<i className="bi bi-bookmark-check-fill"></i>)
        : (<i className="bi bi-bookmark-plus"></i>)
    }
    </button>
  );
};

Bookmark.propTypes = {
  userId: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onFavourite: PropTypes.func
};

export default Bookmark;
