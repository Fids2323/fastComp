import httpService from "./http.service";
const userEndpoint = "qualities/";
const qualityService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  }
};

export default qualityService;
