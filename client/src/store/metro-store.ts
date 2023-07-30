import { createSlice } from "@reduxjs/toolkit";
import objectService from "../services/object-service";
import isOutDated from "../utils/isOutDate";
import metroService from "../services/metro-service";

const metroSlice = createSlice({
  name: "metro",
  initialState: {
    entities: [],
    isLoading: false,
  },
  reducers: {
    metroRequested: (state) => {
      state.isLoading = true;
    },
    metroReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    metroFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: metroReducer, actions } = metroSlice;
const { metroRequested, metroReceived, metroFailed } = actions;

export const loadMetroList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().objects;
  if (isOutDated(lastFetch)) {
    dispatch(metroRequested());
    try {
      const { content } = await metroService.get();
      dispatch(metroReceived(content));
    } catch (error) {
      metroFailed(error.message);
    }
  }
};

export const getMetroList = () => (state) => state.metro.entities;

export const getMetroName = (id) => (state) => {
  const metro = state.metro.entities.filter((m) => m._id === id);
  const result = metro[0]?.name;

  return result;
};

export default metroReducer;
