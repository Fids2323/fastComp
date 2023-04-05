import { createAction, createSlice } from "@reduxjs/toolkit";
import { httpAuth } from "../hooks/useAuth";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import history from "../utils/history";
import { randomInt } from "../utils/randomInt";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getLocalId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      // state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdated: (state, action) => {
      console.log(state.entities);
      const index = state.entities.findIndex((i) => i._id === action.payload._id);
      state.entities[index] = { ...state.entities[index], ...action.payload };
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdated
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFail = createAction("users/createUserFail");

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

const createUser = (data) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(data);
    dispatch(userCreated(content));
    history.push("/users");
  } catch (error) {
    dispatch(createUserFail(error.message));
  }
};

export const updateUser = (newData) => async (dispatch) => {
  const { content } = await userService.update(newData);
  dispatch(userUpdated(content));
  if (newData.email !== getCurrentUserData().email) {
    const { data } = await httpAuth.post("accounts:update", {
      idToken: localStorageService.getAccessToken(),
      email: newData.email,
      returnSecureToken: true
    });
    localStorageService.setTokens(data);
  }
  history.push("/users/" + content._id);
};

export const login =
  ({ payload, redirect }) =>
    async (dispatch) => {
      const { email, password } = payload;
      dispatch(authRequested());
      try {
        const data = await authService.login({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
        localStorageService.setTokens(data);
        history.push(redirect);
      } catch (error) {
        dispatch(authRequestFailed(error.message));
      }
    };
export const singUp =
  ({ email, password, ...rest }) =>
    async (dispatch) => {
      dispatch(authRequested());
      try {
        const data = await authService.register({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(
          createUser({
            _id: data.localId,
            email,
            rate: randomInt(1, 5),
            completedMeetings: randomInt(0, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${(
              Math.random() + 1
            )
              .toString(36)
              .substring(7)}.svg`,
            ...rest
          })
        );
      } catch (error) {
        dispatch(authRequestFailed(error.message));
      }
    };

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};
export const getUsers = () => (state) => {
  return state.users.entities;
};
export const getUserById = (id) => (state) => {
  if (state.users.entities) {
    for (const user of state.users.entities) {
      if (user._id === id) {
        return user;
      }
    }
  }
};
export const getIsLoggedIn = () => (state) => {
  return state.users.isLoggedIn;
};
export const getCurrentUserData = () => (state) => {
  if (state.users.entities) {
    for (const user of state.users.entities) {
      if (user._id === state.users.auth.userId) {
        return user;
      }
    }
  }
};

export const getDataStatus = () => (state) => {
  return state.users.dataLoaded;
};

export const getUsersLoadingStatus = () => (state) => {
  return state.users.isLoading;
};

export const getCurrentUserId = () => (state) => {
  return state.users.auth.userId;
};

export default usersReducer;
