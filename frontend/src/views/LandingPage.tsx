import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { RouteLinks } from '@/types/enums';
import { UserContext } from '@/hooks/UserContextProvider';
import { useContext } from 'react';
import MascotSpoon from '../assets/images/MascotSpoon.png';
import MascotThrone from '../assets/images/MascotThrone.png';
import MascotUmbrella from '../assets/images/MascotUmbrella.png';
import MascotsMicrophones from '../assets/images/MascotsMicrophones.png';
import { Instruction } from '@/components/Instruction';



export const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  return (
    <div className='flex h-max flex-col bg-primary-500 pt-4'>
      <div className='flex h-max w-3/4 flex-col justify-center place-self-center px-4 lg:flex-row'>
        <div className='flex flex-[3] flex-col justify-center'>
          <h1 data-testid="landing-page-hero" className='text-6xl font-bold'>
            <span className='text-primary-900'>Meet Pal</span>, Your Very Own
            <span className='text-primary-900'> Pantry Chef</span>!
          </h1>
          <p className='my-4 text-2xl font-medium'>
            Give Pal the pantry pal a list of ingredients and he'll create
            recipes based on what's in your kitchen!
          </p>
          <Button data-testid="get-started-btn"
            className='mb-4 w-fit rounded-xl bg-tertiary px-8 py-3 text-white hover:bg-tertiary/80'
            onClick={() =>
              navigate(
                user
                  ? `${RouteLinks.ingredients}/${user._id}`
                  : RouteLinks.ingredients,
              )
            }
          >
            Get Started
            <ChevronRightIcon className='ml-2' />
            <ChevronRightIcon className='mr-2' />
          </Button>
        </div>
        <div className='flex flex-[2] justify-center lg:justify-normal'>
          <img
            src={MascotSpoon}
            alt='Mascot holding a spoon'
            className='aspect-auto h-full'
          />
        </div>
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center bg-secondary py-8'>
        <div className='flex h-max w-11/12 flex-col justify-center gap-8 lg:flex-row'>
          <Instruction
            step={1}
            title='Select Ingredients'
            description='Select from a variety of pre-defined ingredients and filters that cater to your needs.'
          />

          <Instruction
            step={2}
            title='Choose Recipe'
            description='Generate three recipes based on selected ingredients or choose to generate more.'
          />

          <Instruction
            step={3}
            title='Start Cooking Mode'
            description='Start an interactive cooking mode which guides you through every step of the way.'
          />
        </div>
      </div>
      <div className='flex h-full w-full flex-col bg-primary-500 pt-4'>
        <div className='flex h-max w-3/4 flex-col justify-center place-self-center px-4 lg:flex-row'>
          <div className='flex flex-[3] flex-col justify-center'>
            <h4 className='font-medium'>We believe that</h4>
            <h1 className='my-2 text-3xl font-bold'>
              Recipes can be created with just about anything
            </h1>
            <p className='font-medium'>
              Finding the perfect recipe shouldn't feel like a tedious task.
              Instead, why not embrace the creativity in your pantry and whip up
              your own culinary concoctions? Turn those challenging moments into
              opportunities for something truly fulfilling—like experimenting
              with your cooking skills—rather than mindlessly scrolling through
              the internet!
            </p>
          </div>
          <div className='flex flex-[2] justify-center'>
            <img
              src={MascotThrone}
              alt='Mascot sitting on a throne'
              className='aspect-auto h-full'
            />
          </div>
        </div>
      </div>
      <div className='flex h-full w-full flex-col bg-primary-500 pt-4'>
        <div className='flex h-max w-3/4 flex-col justify-center place-self-center px-4 lg:flex-row'>
          <div className='flex flex-[2] justify-center lg:justify-normal'>
            <img
              src={MascotUmbrella}
              alt='Mascot holding an umbrella'
              className='aspect-auto h-full'
            />
          </div>
          <div className='flex flex-[3] flex-col justify-center text-end'>
            <h4 className='font-medium'>We give you the ability to</h4>
            <h1 className='my-2 text-3xl font-bold'>
              Create recipes based on weather conditions
            </h1>
            <p className='font-medium'>
              On dreary, rainy days, a crisp salad might not hit the spot.
              That's why we offer you the chance to tailor your recipes to match
              the weather right where you are! Say goodbye to chilly greens and
              embrace the comforting warmth of pasta dishes instead!
            </p>
          </div>
        </div>
      </div>
      <div className='hidden h-full w-full flex-col items-center justify-center bg-secondary py-4 text-white lg:flex'>
        <div className='flex h-min flex-col justify-center px-4 lg:flex-row'>
          <h1 className='h-fit px-4 text-9xl font-bold'>COOK</h1>
          <div className='flex h-32 translate-y-[-150%]'>
            <img
              src={MascotsMicrophones}
              alt='Two mascots each holding a microphone'
              className='aspect-auto h-80'
            />
          </div>
          <h1 className='h-fit px-4 text-9xl font-bold'>TIME</h1>
        </div>
      </div>
    </div>
  );
};
