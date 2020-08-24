import React from 'react';
import './App.css';
import Result from '../Result';
import Search from '../Search';

const App: React.FC = () => {
  return (
    <div className="App">
      <Search/>
      <Result/>
    </div>
  );
};

export default App;
