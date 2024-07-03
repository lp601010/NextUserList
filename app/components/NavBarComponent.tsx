import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import Image from 'next/image';

const NavBarComponent: React.FC = () => {
  return (
    <Navbar
      maxWidth='full'
      position='sticky'
      className='bg-white dark:bg-[#18181B] shadow-sm w-screen'
    >
      <NavbarBrand>
        <a href='https://inyoumarket.com/'>
          <Image
            src='/logo.png'
            alt='logo'
            width={100}
            height={100}
            className='w-[100px] h-auto'
            priority
          />
        </a>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <div className='flex gap-2'>
            <h2 className={'text-gradient'}>Users List</h2>
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <div className='flex gap-2'>
            <ThemeSwitcher />
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBarComponent;
