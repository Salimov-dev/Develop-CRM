import httpService from "../../../shared/redux/services/http-service";
const noteEndpoint = "note/";

const noteService = {
  get: async () => {
    const { data } = await httpService.get(noteEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(noteEndpoint + "create", payload);

    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      noteEndpoint + payload.noteId + "/edit",
      payload
    );
    return data;
  },
  remove: async (noteId) => {
    const { data } = await httpService.delete(noteEndpoint + noteId);
    console.log("data", data);

    return data;
  },
};
export default noteService;
