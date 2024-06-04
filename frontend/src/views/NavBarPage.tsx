import { NavBar } from '@/components/NavBar';
import { Outlet } from 'react-router';

export const NavBarPage = () => {
  return (
    <div className='flex h-full w-full flex-col min-h-screen'>
      <NavBar />
      <Outlet />
    </div>
  );
};
