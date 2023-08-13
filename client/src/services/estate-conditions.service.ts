import httpService from "./http.service";
const estateConditionsEndpoint = "/estateConditions";

const estateConditionsService = {
  get: async () => {
    const { data } = await httpService.get(estateConditionsEndpoint);
    return data;
  },
};
export default estateConditionsService;
