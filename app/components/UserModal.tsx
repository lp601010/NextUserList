import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
interface UserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  isAdd: boolean;
}

export default function UserModal({ isOpen, onOpenChange, isAdd }: UserModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center' isDismissable={false}>
      <form
        className='w-full max-w-xl flex flex-row items-end gap-4'
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            {isAdd ? 'Add User' : 'Edit User'}
          </ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              <Input type='text' label='name' name='name' isRequired={true} />
              <Input
                type='number'
                label='age'
                name='age'
                isRequired={true}
                inputMode='numeric'
                validate={(value) => {
                  if (Number.parseInt(value) < 0 || Number.parseInt(value) > 120) {
                    return 'Age must be between 0 and 120';
                  }
                }}
              />
            </div>
            <Input
              type='email'
              label='Email'
              inputMode='numeric'
              isRequired={true}
              validate={(value) => {
                if (value && !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i))
                  return 'Invalid email';
              }}
            />
            <Input type='tel' label='phone' isRequired={true} />
          </ModalBody>
          <ModalFooter className='justify-center'>
            <Button color='success' variant='flat' type='submit'>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
