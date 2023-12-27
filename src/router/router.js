import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/utils/Login';
import Apputil from '../components/utils/Apputil';

const Iroute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/board" exact element={<Apputil />} />
        <Route path="*" exact element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Iroute;