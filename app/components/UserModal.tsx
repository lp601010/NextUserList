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

const defaultValues = {
  name: '',
  age: '',
  email: '',
  phone: ''
};
type FormValues = typeof defaultValues;

export default function UserModal({ isOpen, onOpenChange, isAdd }: UserModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue
  } = useForm<FormValues>({
    defaultValues
  });

  const validateAge = (value: string) => {
    if (Number.parseInt(value) < 0 || Number.parseInt(value) > 120) {
      return 'Age must be between 0 and 120';
    }
  };
  const validateEmail = (value: string) => {
    if (value && !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) return 'Invalid email';
  };

  const onSubmit = (data: FormValues) => {
    alert('Submitted value: ' + JSON.stringify(data));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      isDismissable={false}
      onClose={reset}
    >
      <form
        className='w-full max-w-xl flex flex-row items-end gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            {isAdd ? 'Add User' : 'Edit User'}
          </ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              <Input
                type='text'
                label='name'
                isRequired={true}
                {...register('name', { required: 'Name is required' })}
                isInvalid={!!errors.name}
                errorMessage={<>{errors.name?.message}</>}
              />
              <Input
                type='number'
                label='age'
                isRequired={true}
                inputMode='numeric'
                isInvalid={!!errors.age}
                {...register('age', { required: 'Age is required', validate: validateAge })}
                errorMessage={<>{errors.age?.message}</>}
              />
            </div>
            <Input
              type='email'
              label='Email'
              inputMode='numeric'
              isRequired={true}
              isInvalid={!!errors.email}
              errorMessage={<>{errors.email?.message}</>}
              {...register('email', {
                required: 'Email Address is required',
                validate: validateEmail
              })}
            />
            <Input
              type='tel'
              label='phone'
              isRequired={true}
              {...register('phone', { required: 'Phone number is required' })}
              isInvalid={!!errors.phone}
              errorMessage={<>{errors.phone?.message}</>}
            />
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
