import LoginForm from '@/components/LoginForm';
import MascotComputer from '@/assets/images/MascotComputer.png';
import { Card } from '@/components/ui/card';

export const LoginPage = () => {
  return (
    <div className='flex h-screen w-screen flex-row items-center justify-center bg-secondary'>
      <Card className='flex h-4/5 w-4/5'>
        <LoginForm />
        <div className='hidden flex-[4] items-center justify-center overflow-hidden object-contain lg:flex'>
          <img
            src={MascotComputer}
            alt='Mascot sitting at a desk with a computer'
            className='h-full w-full'
          />
        </div>
      </Card>
    </div>
  );
};
