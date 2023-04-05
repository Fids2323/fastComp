import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./professions";

const rootReducer = combineReducers({ qualitiesReducer, professionsReducer });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
