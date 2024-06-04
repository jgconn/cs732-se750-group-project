import { RecipesDisplay } from "@/components/RecipesDisplay";
import { RecipesWrapper } from "@/components/RecipesWrapper";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/hooks/UserContextProvider";
import { API_BASE_URL } from "@/types/constants";
import axios from "axios";
import { useContext, useEffect } from "react";

export const HistoryPage = () => {
  const { user, history, setHistory } = useContext(UserContext);
  const { toast } = useToast();

  // On mount fetch history recipes
  useEffect(() => {
    axios.get(`${API_BASE_URL}/history/${user?._id}`).then((response) => {
      if (response.data.historyRecipes.length > 0) {
        setHistory(response.data.historyRecipes);
      }
    }).catch(() => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch history. Please try again.',
        duration: 3000,
      })
    })
  }, []);

  return (
    <RecipesWrapper>
      <Card className='h-full w-full bg-white p-4'>
        <CardHeader className='mb-4'>
          <CardTitle className='flex items-center justify-between text-3xl text-secondary' >
            Recipe History
          </CardTitle>
          <CardDescription className='text-secondary'>
            Your past recipes generated
          </CardDescription>
        </CardHeader>        
        {history.length === 0 ? (
          <h1 className='text-center text-3xl font-semibold'>No Recipes Viewed Yet!</h1>
        ) : (
          <RecipesDisplay recipes={history} />
        )}
      </Card>
    </RecipesWrapper>
  );
};
