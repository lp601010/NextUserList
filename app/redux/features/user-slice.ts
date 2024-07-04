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
  editingUserId?: number;
};

const initialState: UserState = {
  userList: [],
  removeToEmpty: false
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    putUser: (state, action: PayloadAction<UserType>) => {
      const user = state.userList.find((user) => user.id === action.payload.id);
      if (!user) {
        state.userList.push(action.payload);
      } else {
        state.userList = state.userList.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      }
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.userList = state.userList.filter((user) => user.id !== action.payload);
      if (state.userList.length === 0) {
        state.removeToEmpty = true;
      }
    },
    setEditingUserId: (state, action: PayloadAction<number | undefined>) => {
      state.editingUserId = action.payload;
    }
  }
});

export const { putUser, removeUser, setEditingUserId } = users.actions;
export default users.reducer;
