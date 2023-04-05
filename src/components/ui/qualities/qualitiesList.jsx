import React, { useEffect } from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesById,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const qualitiesArr = useSelector(getQualitiesById(qualities));
    const isLoading = useSelector(getQualitiesLoadingStatus());

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) {
        return "Загрузка...";
    }
    return (
        <>
            {qualitiesArr.map((quality) => (
                <Qualitie key={quality._id} {...quality} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
