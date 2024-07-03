import React from 'react';
import { Button } from '@nextui-org/react';
import { UserIcon } from '../icons/UserIcon';

export default function AddUserButton() {
  return (
    <div className='flex gap-4 justify-evenly m-6'>
      <Button color='success' variant='bordered' startContent={<UserIcon />}>
        Add user
      </Button>
    </div>
  );
}
