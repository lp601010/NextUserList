import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserType = {
  id: number;
  name: string;
  age: string;
  avatar?: string;
  email: string;
};

type UserState = {
  userList: UserType[];
};

const initialState: UserState = {
  userList: []
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
