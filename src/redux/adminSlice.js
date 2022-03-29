import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  filteredUsers: [],
};

export const adminSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      state.users = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredUsers = action.payload;
    },
  },
});

export const { setUsersData, setFilteredData } = adminSlice.actions;

export const fetchDataFromAPI = () => async (dispatch) => {
  try {
    await axios
      .get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      )
      .then((response) =>
        dispatch(
          setUsersData(
            response.data.map((item) => {
              return { ...item, isChecked: false };
            })
          )
        )
      );
  } catch (e) {
    return console.log(e);
  }
};

export default adminSlice.reducer;
