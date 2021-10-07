import React from 'react';
import Inbox from './components/Inbox';
import HeaderHtml from './components/templates/HeaderHtml';
import './styles.css';

function App() {
  return (
    <div>
      <HeaderHtml />
      <div className="container">
        <Inbox />
      </div>
    </div>
  );
}

export default App;
