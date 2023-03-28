import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { qualities, isLoading } = useQualities();
    const quality = qualities.find((i) => i._id === id);
    if (!isLoading && quality) {
        return (
            <li
                className={"badge " + "bg-" + quality.color + " m-1"}
                key={quality._id}
            >
                {quality.name}{" "}
            </li>
        );
    } else {
        return "Загрузка...";
    }
};

Qualitie.propTypes = {
    id: PropTypes.string.isRequired
};

export default Qualitie;
