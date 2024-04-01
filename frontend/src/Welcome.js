import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </header>
    </div>
  );
}

export default Welcome;
