'use client';
import React, { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Spinner
} from '@nextui-org/react';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, UserType } from '../redux/features/user-slice';
import { AppDispatch, RootState } from '../redux/store';

const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'AGE', uid: 'age' },
  { name: 'ACTIONS', uid: 'actions' }
];

export default function UserTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { userList } = useSelector((state: RootState) => state.userReducer);

  async function getRandomImage() {
    const response = await fetch('https://picsum.photos/150');
    return response.url;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/users.json');
      const data = await response.json();
      const users = data as UserType[];

      for (let user of users) {
        user.avatar = await getRandomImage();
        dispatch(addUser(user));
      }
    };

    fetchUsers();
  }, [dispatch]);

  const renderCell = React.useCallback((user: UserType, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserType];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case 'age':
        return <div className='capitalize'>{cellValue}</div>;
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Edit user'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete user'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label='User list' className='min-w-0'>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={userList}
        isLoading={userList.length === 0}
        loadingContent={<Spinner label='loading...' color='default' labelColor='foreground' />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
