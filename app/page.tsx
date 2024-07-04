'use client';
import { useDisclosure } from '@nextui-org/react';
import AddUserButton from './components/AddUserButton';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import { useState } from 'react';
import ReduxProvider from './redux/provider';
import NavBarComponent from './components/NavBarComponent';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAdd, setIsAdd] = useState(true);

  return (
    <ReduxProvider>
      <NavBarComponent />
      <main>
        <div className='grid gap-2 max-w-7xl w-full mx-auto'>
          <AddUserButton
            onPress={() => {
              setIsAdd(true);
              onOpen();
            }}
          />
          <UserTable
            onEdit={() => {
              setIsAdd(false);
              onOpen();
            }}
          />
          <UserModal isOpen={isOpen} onOpenChange={onOpenChange} isAdd={isAdd} />
        </div>
      </main>
    </ReduxProvider>
  );
}
