import { useState, useRef, useEffect, SetStateAction, useContext } from 'react';
import axios from 'axios';
import { loadWeatherDetail } from '@/hooks/weather';

import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { UserContext } from '@/hooks/UserContextProvider';
import { Tooltip } from 'react-tooltip'
import { SearchBar } from './SearchBar';
import { API_KEY } from '@/types/constants';
import { WeatherData, SearchCityResult } from '@/types/interfaces';
import { useToast } from './ui/use-toast';

export const WeatherSearchBar = () => {
  const [searchKeyWord, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchCityResult[]>([]);
  const [chosenLocation, setChosenLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [roundedTemp, setRoundedTemp] = useState('');
  const [weatherDetail, setWeatherDetail] = useState('');
  const [weatherImg, setWeatherImg] = useState('');
  const queryTimeout = useRef<any>(null);
  const { setWeatherDetails } = useContext(UserContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const maxHeight = 4

    // Handle click outside of suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !inputRef.current?.contains(event.target as Node) &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    searchLocation();
  }, [searchKeyWord]);

  useEffect(() => {
    updateWeather();
  }, [weatherData]);

  useEffect(() => {
    const toGive = [weatherImg, weatherDetail, roundedTemp, chosenLocation];
    setWeatherDetails(toGive);
  }, [weatherImg, weatherDetail, roundedTemp, chosenLocation]);

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchKeyword(e.target.value);
    setRoundedTemp('');
    setWeatherDetail('');
    setWeatherImg('');
  };


  const searchLocation = () => {
    clearTimeout(queryTimeout.current);
    queryTimeout.current = setTimeout(() => {
      if (searchKeyWord !== '') {
        axios
          .get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchKeyWord}&limit=4&appid=${API_KEY}`)
          .then(response => {
            setSearchResults(response.data);
          })
          .catch(() => {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Could not fetch search results. Please try again.',
              duration: 3000,
            })
          });
      } 
      setSearchResults([]);
    }, 250);
  };


  //Weather search functionality
  const processWeatherInfo = async (searchResult: any) => {
    setWeatherData(await loadWeatherDetail(searchResult.lat, searchResult.lon));
    if (searchResult.state) {
      setChosenLocation(
        `${searchResult.name}, ${searchResult.state}, ${searchResult.country}`,
      );
    } else {
      setChosenLocation(`${searchResult.name}, ${searchResult.country}`);
    }
  };

  const updateWeather = () => {
    if (weatherData) {
      setRoundedTemp(`${Math.round(weatherData.main.temp)}°`);
      setWeatherDetail(`${weatherData.weather[0].description}`);
      setWeatherImg(
        `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      );
    } else {
    }
    setSearchResults([]);
    setSearchKeyword('');
  };

  return (
    <Card className='bg-secondary p-4 text-white'>
      <CardHeader className='mb-4 flex flex-col'>
        <div className='flex flex-row justify-between'>
          <CardTitle className='text-3xl'>Location</CardTitle>
          <Button   
            data-tooltip-id="my-tooltip" 
            className='m-0 size-6 min-w-0 rounded-full border-2 bg-transparent p-0 hover:scale-105 hover:bg-transparent'>
            ?
          </Button>
          <Tooltip id='my-tooltip' place='left' className='max-w-44'>
                Our special 'match the mood with your food' feature generates recipes based on your weather conditions!
          </Tooltip>
        </div>
        <CardDescription className='text-white'>
          Search your location for weather specific recipes (Case sensitive)
        </CardDescription>
      </CardHeader>
      <div className='flex flex-1 items-center justify-between text-black'>
        <div className='relative flex flex-1 items-center self-stretch'>
          <SearchBar
              searchBarRef={inputRef}
              onFocus={() => setIsExpanded(true)}
              inPlaceholder='Insert city'
              inValue = {searchKeyWord}
              onInChange = {handleInputChange}
              data-testid="searchWeather"
            >

              {isExpanded && searchResults?.length ? (
                <div
                className='absolute left-0 top-full z-50 mt-1 w-full overflow-y-auto rounded-lg bg-white px-0 py-2'
                ref={suggestionsRef}
                style={{ maxHeight: `${maxHeight - 20}px` }}
              >                  

              {searchResults.map((searchResult: any) => {
                  const resultId = `${searchResult.lat}${searchResult.lon}`;
                  return (
                    <div 
                      key={resultId}
                      className='block cursor-pointer px-4 py-2 hover:bg-neutral-100'
                      onClick={() => {
                        setIsExpanded(false);
                        processWeatherInfo(searchResult);
                        }}
                    >
                        {searchResult.name}
                        <span>
                          {searchResult.state
                            ? `, ${searchResult.state}, `
                            : ', '}
                        </span>
                        {searchResult.country}
                    </div>
                  );

              })}
              </div>
              ) : null}
            </SearchBar>
        </div>
      </div>

      <p className='pb-3 pt-3'>{chosenLocation}</p>
      <img className='rounded-xl bg-warning-300' src={weatherImg}></img>
      <p className='capitalize'>
        {weatherDetail} {roundedTemp}
      </p>
    </Card>
  );
};
