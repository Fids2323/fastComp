import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualitiesReducer;
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.get();
            dispatch(qualitiesReceved(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

export const getQualities = () => (state) => {
    return state.qualitiesReducer.entities;
};
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualitiesReducer.isLoading;
export const getQualitiesById = (ids) => (state) => {
    if (state.qualitiesReducer.entities) {
        const qualitiesArray = [];
        for (const id of ids) {
            for (const quality of state.qualitiesReducer.entities) {
                if (quality._id === id) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};
export default qualitiesReducer;
