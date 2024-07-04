import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserType = {
  id: number;
  name: string;
  age: string;
  avatar?: string;
  email: string;
  phone: string;
};

export type UserState = {
  userList: UserType[];
  removeToEmpty: boolean;
};

const initialState: UserState = {
  userList: [],
  removeToEmpty: false
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      const user = state.userList.find((user) => user.id === action.payload.id);
      if (!user) {
        state.userList.push(action.payload);
      }
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.userList = state.userList.filter((user) => user.id !== action.payload);
      if (state.userList.length === 0) {
        state.removeToEmpty = true;
      }
    },
    editUser: (state, action: PayloadAction<UserType>) => {
      const index = state.userList.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.userList[index] = action.payload;
      }
    }
  }
});

export const { addUser, removeUser, editUser } = users.actions;
export default users.reducer;
