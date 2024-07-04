'use client';
import { useDisclosure } from '@nextui-org/react';
import AddUserButton from './components/AddUserButton';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className='grid gap-2 max-w-7xl w-full mx-auto'>
      <AddUserButton onPress={onOpen} />
      <UserTable />
      <UserModal isOpen={isOpen} onOpenChange={onOpenChange} isAdd={true} />
    </div>
  );
}
