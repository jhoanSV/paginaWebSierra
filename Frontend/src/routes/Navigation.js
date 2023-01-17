import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function LoggedNavigation() {
    return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<h2></h2>} />
          </Routes>
      </BrowserRouter>
    );
  }