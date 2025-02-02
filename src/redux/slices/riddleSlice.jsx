import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wholeRiddle: {
    riddle: "",
    answer: "",
  },
};
const BASE_URL = "https://riddles-api.vercel.app";
export const getRandomRiddle = createAsyncThunk("getRandomRiddle", async () => {
  const response = await axios.get(`${BASE_URL}/random`);
  console.log("API'den Gelen Cevap:", response.data); // Cevabı konsolda gör
  return response.data;
});

export const riddleSlice = createSlice({
  name: "riddle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRandomRiddle.fulfilled, (state, action) => {
      state.wholeRiddle = action.payload;
    });
    builder.addCase(getRandomRiddle.rejected, (state) => {
      state.error = "Bilmece yüklenemedi";
    });
  },
});

export default riddleSlice.reducer;
