import React from 'react';
import './App.css';
import Swap from './pages/Swap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <ToastContainer theme="dark" position="bottom-right" autoClose={1500} />
      <Swap />
    </div>
  );
};

export default App;
