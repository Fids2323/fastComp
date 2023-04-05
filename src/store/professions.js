import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceved(content));
        } catch (error) {
            dispatch(professionsRequestFailed(error.message));
        }
    }
};

export const getProfessions = () => (state) => {
    return state.professions.entities;
};
export const getProfessionsLoadingStatus = () => (state) => {
    return state.professions.isLoading;
};
export const getProfessionById = (id) => (state) => {
    if (state.professions.entities) {
        for (const profession of state.professions.entities) {
            if (profession.id === id) {
                return profession;
            }
        }
    }
};
export default professionsReducer;
