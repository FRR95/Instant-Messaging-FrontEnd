import { createSlice } from '@reduxjs/toolkit';

export const chatDetailSlice = createSlice({
    name: 'chatDetail',
    initialState: {
      chatDetail: {}
    },
    reducers: {
      updateChatDetail: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
    }
    
});

export const { updateChatDetail } = chatDetailSlice.actions;

export const chatDetailData = (state) => state.chatDetail;

export default chatDetailSlice.reducer;