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
  Spinner,
  Link
} from '@nextui-org/react';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { useDispatch, useSelector } from 'react-redux';
import { UserType, removeUser, setEditingUserId } from '../redux/features/user-slice';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUsers } from '../api/fetchApi';

const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'AGE', uid: 'age' },
  { name: 'ACTIONS', uid: 'actions' }
];

export default function UserTable({ onEdit }: { onEdit: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const { userList, removeToEmpty } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    fetchUsers(dispatch);
  }, [dispatch]);

  const renderCell = React.useCallback((user: UserType, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserType];
    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar || '' }}
            description={
              <>
                <Link href={`mailto:${user.email}`} size='sm' isExternal>
                  {user.email}
                </Link>
                <div>Tel: {user.phone}</div>
              </>
            }
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
              <button
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
                onClick={() => {
                  dispatch(setEditingUserId(user.id));
                  onEdit();
                }}
                data-testid={'editButton'}
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color='danger' content='Delete user'>
              <button
                className='text-lg text-danger cursor-pointer active:opacity-50'
                onClick={() => dispatch(removeUser(user.id))}
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label='User list' className='min-w-0' style={{ maxHeight: '70vh' }}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={userList}
        isLoading={userList.length === 0 && !removeToEmpty}
        loadingContent={<Spinner label='loading...' color='default' labelColor='foreground' />}
        emptyContent={'Everybody went home.'}
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
