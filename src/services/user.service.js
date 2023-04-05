import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const userEndpoint = "users/";
const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getLocalId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    fetchAll: async () => {}
};

export default userService;
