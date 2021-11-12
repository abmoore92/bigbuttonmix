import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Global } from '@emotion/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';
import { Initial } from '../pages/index';
import { Results } from '../pages/results';
import { Routes as RoutePaths } from '../constants/routes';
import { getMapboxLocation } from '../api/getMapboxLocation';

const App = () => {
  // useEffect(() => {
  //   if (navigator && navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async ({ coords }) => {
  //       const { latitude, longitude } = coords;

  //       const response = await getMapboxLocation(latitude, longitude);

  //       /**
  //        * Parsing of response to get the short code for the country and a city name
  //        */
  //       const deviceLocation = response.data.features.reduce<{
  //         countryCode: string;
  //         city: string;
  //       }>(
  //         (acc, currentValue) => {
  //           if (currentValue.id.includes('place')) {
  //             const city = currentValue.place_name.split(',')[0].toLowerCase();
  //             return { ...acc, city };
  //           }

  //           if (currentValue.id.includes('country')) {
  //             const countryCode = currentValue.properties.short_code ?? '';
  //             return { ...acc, countryCode };
  //           }

  //           return acc;
  //         },
  //         { countryCode: '', city: '' }
  //       );

  //       localStorage.setItem('device-location', JSON.stringify(deviceLocation));

  //       console.log(deviceLocation);
  //     });
  //   }
  // }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Routes>
          <Route path={RoutePaths.Index} element={<Initial />} />
          <Route path={RoutePaths.Results} element={<Results />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
