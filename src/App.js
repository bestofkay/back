import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Sign from './pages/Sign';
import Orders from './pages/Orders';
import Products from './pages/Products';
import NewProd from './pages/NewProd';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          {/* dashboard  */}
          <Route path="/" element={(<Dashboard />)} />

          {/* products  */}
          <Route path="/orders" element={<Orders />} />
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":productId" element={<NewProd />} />
          </Route>
          <Route path="/login" element={<Sign />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
