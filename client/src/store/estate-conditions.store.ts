import { createSlice } from "@reduxjs/toolkit";
import estateConditionsService from "../services/estate-conditions.service";

const estateConditionsSlice = createSlice({
  name: "estateConditions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    estateConditionsRequested: (state) => {
      state.isLoading = true;
    },
    estateConditionsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    estateConditionsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: estateConditionsReducer, actions } = estateConditionsSlice;
const { estateConditionsRequested, estateConditionsReceived, estateConditionsFailed } = actions;

export const loadEstateConditionsList = () => async (dispatch) => {
  dispatch(estateConditionsRequested());
  try {
    const { content } = await estateConditionsService.get();
    dispatch(estateConditionsReceived(content));
  } catch (error) {
    estateConditionsFailed(error.message);
  }
};

export const getEstateConditionsList = () => (state) => state.estateConditions.entities;

export const getEstateConditionsStatus = () => (state) => state.estateConditions.isLoading;

export const getEstateConditionById = (id) => (state) => {
  const estateConditions = state?.estateConditions?.entities?.find((cond) => cond?._id === id);
  const result = estateConditions?.name;

  return result;
};


export default estateConditionsReducer;
