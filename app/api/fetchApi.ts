import { Action, Dispatch, ThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { UserType, putUser, UserState } from '../redux/features/user-slice';

async function fetchData(url: string): Promise<Response | void> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('An error occurred:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
}

async function getRandomImage() {
  const response = await fetchData('https://picsum.photos/150');
  return response?.url;
}

export const putUserWithRandomAvatar =
  (user: UserType): ThunkAction<void, { userReducer: UserState }, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(putUser(user));
    const avatar = await getRandomImage();
    dispatch(putUser({ ...user, avatar }));
  };

export const fetchUsers = async (
  dispatch: ThunkDispatch<
    {
      userReducer: UserState;
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>
) => {
  const response = await fetchData('/users.json');
  const data = await response?.json();
  const users = data as UserType[];

  for (let user of users) {
    dispatch(putUserWithRandomAvatar(user));
  }
};
