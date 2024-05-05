import { createSlice } from '@reduxjs/toolkit';

export const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState: {
      userDetail: {}
    },
    reducers: {
      updateUserDetail: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
    }
    
});

export const { updateUserDetail } = userDetailSlice.actions;

export const userDetailData = (state) => state.userDetail;

export default userDetailSlice.reducer;