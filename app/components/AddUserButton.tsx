import React from 'react';
import { Button } from '@nextui-org/react';
import { UserIcon } from '../icons/UserIcon';

interface AddUserButtonProps {
  onPress: () => void;
}

export default function AddUserButton({ onPress }: AddUserButtonProps) {
  return (
    <div className='flex gap-4 justify-evenly m-6'>
      <Button color='success' variant='bordered' startContent={<UserIcon />} onPress={onPress}>
        Add user
      </Button>
    </div>
  );
}
