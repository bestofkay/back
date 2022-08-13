import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard, Orders, Calendar, Products, NewProd, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Sign } from './pages';
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
          <Route path="/customers" element={<Customers />} />
          <Route path="/login" element={<Sign />} />

          {/* apps  */}
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/color-picker" element={<ColorPicker />} />

          {/* charts  */}
          <Route path="/line" element={<Line />} />
          <Route path="/area" element={<Area />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/color-mapping" element={<ColorMapping />} />
          <Route path="/pyramid" element={<Pyramid />} />
          <Route path="/stacked" element={<Stacked />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
