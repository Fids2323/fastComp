import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ _id, color, name }) => {
  return (
    <li className={"badge " + "bg-" + color + " m-1"} key={_id}>
      {name}{" "}
    </li>
  );
};

Qualitie.propTypes = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualitie;
