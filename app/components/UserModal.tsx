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
import { UserType, putUser, setEditingUserId } from '../redux/features/user-slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { putUserWithRandomAvatar } from '../api/fetchApi';
interface UserModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isAdd: boolean;
}

const defaultValues: UserType = {
  id: 99,
  name: '',
  age: '',
  email: '',
  phone: ''
};

export default function UserModal({ isOpen, onOpenChange, isAdd }: UserModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { userList, editingUserId } = useSelector((state: RootState) => state.userReducer);
  const maxId = Math.max(...userList.map((user) => user.id));
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<UserType>({
    defaultValues
  });

  const validateAge = (value: string) => {
    const numberValue = Number.parseInt(value);
    if (numberValue < 0 || numberValue > 120) {
      return 'Age must be between 0 and 120';
    }
  };
  const validateEmail = (value: string) => {
    if (value && !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) return 'Invalid email';
  };

  React.useEffect(() => {
    !isAdd && editingUserId && reset(userList.find((user) => user.id === editingUserId));
  }, [isAdd, editingUserId]);

  const onSubmit = (data: UserType) => {
    const newId = maxId + 1;
    if (isAdd) {
      dispatch(putUser({ ...data, id: newId }));
      dispatch(putUserWithRandomAvatar({ ...data, id: newId }));
    } else {
      dispatch(putUser(data));
    }
    dispatch(setEditingUserId(undefined));
    reset(defaultValues);
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='top-center'
      isDismissable={false}
      onClose={() => {
        reset(defaultValues);
      }}
      className='overflow-y-auto'
      style={{ maxHeight: '80%' }}
    >
      <form
        className='w-full max-w-xl flex flex-row items-end gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalContent>
          {() => (
            <>
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
                  type='text'
                  label='Email'
                  inputMode='email'
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
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
}
