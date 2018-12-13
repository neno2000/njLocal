/* Import statements */
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Servdetail from './Servdetail';

/* App component */
class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }
  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
      fetch('/metadata/services')
          .then(res => res.json())
          .then(list => this.setState({ list }));
  }

  render() {
    const { list } = this.state;
    var lin = [];
    for (var x in list) {
          if (list.hasOwnProperty(x)) {
              console.log(x);
              lin.push(x);
          }
      }

      return (
          <div>
        <h2>Available Services</h2>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            {
                Object.keys(lin).map(function(key, index) {
                              return <li key={index} className="list-group-item list-group-item-info"> <Link to={lin[key]}>{lin[key]
                    }</Link></li>;
                })
            }
          </ul>
         </nav>
         <Route path="/:servicedetail" component={Servdetail}/>
      </div>
      );
  }
}
export default List;
