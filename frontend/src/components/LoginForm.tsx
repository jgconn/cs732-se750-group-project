import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@/types/constants';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '@/hooks/UserContextProvider';
import { RouteLinks } from '@/types/enums';
import { useToast } from './ui/use-toast';

export default function LoginForm() {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
    },
  });

  // Handle form submission
  function onSubmit(data: any) {
    axios
      .post(`${API_BASE_URL}/createSession/${data.username}`)
      .then((sessionInfoResponse) => {
        if (sessionInfoResponse.data && sessionInfoResponse.status === 200) {
          const sessionId = sessionInfoResponse.data._id;
          // Return the second axios call from within the first `then` block
          return axios.get(`${API_BASE_URL}/session/${sessionId}`);
        }
        // Return a rejected promise if conditions are not met
        return Promise.reject("Session info not available");
      })
      .then((sessionResponse) => {
        if (sessionResponse.data && sessionResponse.status === 200) {
          const userData = sessionResponse.data;
          updateUser(userData);
          navigate(`${RouteLinks.ingredients}/${userData._id}`);
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not create session. Please try again.',
          duration: 3000,
        })
      });
  }
  

  return (
    <div className='z-10 flex flex-[2] flex-col items-center justify-center rounded-s-lg bg-white'>
      <div className='mx-auto flex w-2/3 flex-col gap-6 px-2'>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Welcome back!</h1>
          <h2 className='text-lg font-medium text-gray-500'>
            Enter your username to create a session
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Username'
                      {...field}
                      minLength={8}
                      required
                      data-testid="username-input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='bg-tertiary hover:bg-tertiary/80'
              size='lg'
              disabled={!form.formState.isValid}
              data-testid="login-btn"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
