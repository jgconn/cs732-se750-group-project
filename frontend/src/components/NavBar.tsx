import { UserRound } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { RouteLinks } from '@/types/enums';
import { UserContext } from '@/hooks/UserContextProvider';
import { useContext } from 'react';

export const NavBar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  return (
    <nav className='sticky top-0 flex h-full z-50 flex-row items-center justify-between bg-secondary px-12 py-4 gap-4'>
      <div className='flex gap-8 font-medium text-white flex-1'>
        <a href={RouteLinks.landing}>Home</a>
        <a href={
            user ? `${RouteLinks.ingredients}/${user._id}`
          : RouteLinks.ingredients}>
            Recipe Generation
        </a>
        <a
          href={
            user
              ? `${RouteLinks.favourites}/${user._id}`
              : RouteLinks.login
          }
        >
          Favourites
        </a>
        <a
          href={user ? `${RouteLinks.history}/${user._id}` : RouteLinks.login}
        >
          History
        </a>
      </div>
      <h1
        className='text-3xl font-bold text-white hover:cursor-pointer'
        onClick={() => navigate(RouteLinks.landing)}
        data-testid="landing-image"
      >
        PantryPal
      </h1>
      <div className='flex-1 flex justify-end'>
      <Button
        data-testid="username-btn"
        className='bg-tertiary hover:bg-tertiary/80'
        size='lg'
        onClick={() => navigate(RouteLinks.login)}
      >
        <UserRound className='mr-2 h-5 w-5 fill-white' />
        {user ? user.username : 'Login'}
      </Button>
      </div>
    </nav>
  );
};
