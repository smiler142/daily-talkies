import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Loader from './components/common/Loader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorPage, setIsErrorPage] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const errorPaths = ['/403', '/404', '/500'];

    if (errorPaths.includes(currentPath)) {
      setIsErrorPage(true);
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;


// routerV6 