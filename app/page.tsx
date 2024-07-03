import UserButton from './components/AddUserButton';
import UserTable from './components/UserTable';

export default function Home() {
  return (
    <div className='grid gap-2 max-w-7xl w-full mx-auto'>
      <UserButton />
      <UserTable />
    </div>
  );
}
