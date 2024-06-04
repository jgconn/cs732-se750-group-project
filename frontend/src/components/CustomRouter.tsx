import { UserContext } from '@/hooks/UserContextProvider';
import { API_BASE_URL } from '@/types/constants';
import { RouteLinks } from '@/types/enums';
import { IngredientsPage } from '@/views/IngredientsPage';
import { LandingPage } from '@/views/LandingPage';
import { LoginPage } from '@/views/LoginPage';
import { NavBarPage } from '@/views/NavBarPage';
import RecipePage from '@/views/RecipePage';
import { ResultsPage } from '@/views/ResultsPage';
import { FavouritesPage } from '@/views/FavouritesPage';
import { HistoryPage } from '@/views/HistoryPage';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export const CustomRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  // Function to construct URLs with session ID included if available
  const constructUrlWithSessionId = (path: string) => {
    return user?._id ? `${path}/${user._id}` : path;
  };
  const sessionId = window.location.pathname.split('/').pop();

  // On mount check if there is a session
  useEffect(() => {
    // Check if sessionId matches any enum value
    const isSessionIdValid = Object.values(RouteLinks).some(link => {
      const pathWithSessionId = constructUrlWithSessionId(link);
      return sessionId === pathWithSessionId.split('/').pop();
    });

    // If the sessionId is not valid, return
    if (!isSessionIdValid) {
      return;
    }

    axios.get(`${API_BASE_URL}/session/${sessionId}`).then((response) => {
      if (response.status === 200) {
        updateUser(response.data);
        navigate(location.pathname);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <Routes location={location}>
      <Route path={RouteLinks.landing} element={<NavBarPage />}>
        <Route index element={<LandingPage />} />
        <Route
          path={constructUrlWithSessionId(RouteLinks.ingredients)}
          element={<IngredientsPage />}
        />
        <Route
          path={constructUrlWithSessionId(RouteLinks.results)}
          element={<ResultsPage />}
        />
        <Route
          path={constructUrlWithSessionId(RouteLinks.recipe)}
          element={<RecipePage />}
        />

        <Route
          path={constructUrlWithSessionId(RouteLinks.favourites)}
          element={<FavouritesPage />}
        />
        <Route
          path={constructUrlWithSessionId(RouteLinks.history)}
          element={<HistoryPage />}
        />
      </Route>
      <Route path={RouteLinks.login} element={<LoginPage />} />
      <Route path='*' element={<Navigate to={RouteLinks.landing} />} />
    </Routes>
  );
};
