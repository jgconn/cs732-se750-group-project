import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { UserContext } from '@/hooks/UserContextProvider';
import { useContext, useEffect } from 'react';
import { restrictions, API_BASE_URL } from '@/types/constants';
import { useNavigate } from 'react-router-dom';
import { RouteLinks } from '@/types/enums';
import axios from 'axios';
// import { error } from 'console';

interface FiltersProps {
  setLoading: (loading: boolean) => void;
}

export const Filters = ({ setLoading }: FiltersProps) => {
  const { user } = useContext(UserContext);
  const { ingredients, setRecipes, filters, setFilters, weatherDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const form = useForm<{
    maxCookingTime: number;
    servingSize: number;
    restrictions: string[];
    weatherSearch: string[];
  }>({
    defaultValues: filters ? filters : {
      maxCookingTime: 15,
      servingSize: 1,
      restrictions: [],
      weatherSearch: [],
    },
  });

  // Watching for changes in the form
  const watchFormValues = form.watch();

  // Save filters state every time one of the fields changes
  useEffect(() => {
    setFilters(watchFormValues);
  }, [watchFormValues, setFilters]);

  // Handle form submission
  async function onSubmit(data: any) {
    const dataToSend = { ...data, ingredients };
    // Set loading state to true while the API call is being made
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/recipe`, dataToSend)
      .then((response) => {
        if (response.data && response.status === 200) {
          setRecipes(response.data.data);
          navigate(
            user ? `${RouteLinks.results}/${user._id}` : RouteLinks.results,
          );
        }
      })
      .catch((error) => {
        console.error(error);
      })
      // Set loading state to false once the API call is complete
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(()=> {
    form.setValue('weatherSearch', weatherDetails);
  }, [weatherDetails])


  return (
    <Card className='h-fit w-full bg-secondary p-4 text-white'>
      <CardHeader className='mb-6 flex flex-col'>
        <h1 className='mb-1 text-3xl font-bold'>Filters</h1>
        <h2 className='text-base font-normal'>Specify recipe restrictions</h2>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='maxCookingTime'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='text-base font-normal'>
                      Maximum Cooking time
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={15}
                        max={240}
                        step={15}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className='my-2'
                        data-testid="maxCookingTime"
                      />
                    </FormControl>
                    <h3 className='text-end'>{field.value} minutes</h3>
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name='servingSize'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel className='text-base font-normal'>
                        Serving Size
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className='my-2'
                        />
                      </FormControl>
                      <h3 className='text-end'>{field.value} servings</h3>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <h2 className='mb-2 text-lg'>Dietary Restrictions</h2>
              <FormField
                control={form.control}
                name='restrictions'
                render={() => (
                  <FormItem className='grid grid-cols-2 gap-3 space-y-0'>
                    {restrictions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='restrictions'
                        render={({ field }) => (
                          <FormItem key={item.id} className='flex items-center'>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) =>
                                  checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    )
                                }
                                data-testid="dietary-checkbox"
                              />
                            </FormControl>
                            <FormLabel className='!mt-0 ml-2 text-base font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <Button
                className='mt-8 w-full bg-tertiary hover:bg-tertiary/80'
                type='submit'
                size='lg'
                data-testid="submitIngredientForm"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
