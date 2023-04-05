import React from "react";
import PropTypes from "prop-types";

const RenderPhrase = ({ number }) => {
  const person = () => {
    if (
      (number % 10 === 2 && number !== 12) ||
      (number % 10 === 3 && number !== 13) ||
      (number % 10 === 4 && number !== 14)
    ) {
      return "человека";
    } else {
      return "человек";
    }
  };

  return number !== 0
    ? (<span className="badge bg-primary"> {" "} {number + " " + person() + " тусанет с тобой сегодня"}</span>)
    : (<span className="badge bg-danger">Никто с тобой не тусанет</span>);
};

RenderPhrase.propTypes = {
  number: PropTypes.number.isRequired
};

export default RenderPhrase;
