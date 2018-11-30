import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Reactive Collectum</h1>
      {/* Link to List.js */}
      <Link to={'./list'}>
        <button variant="raised">
            Services
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;
