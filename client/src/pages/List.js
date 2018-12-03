/* Import statements */
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Servdetail from './Servdetail';
import Links from './Links'



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
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;
    var lin = [];
    for (var x in list){
      console.log(x);
      lin.push(x);
    }

    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            {
              Object.keys(lin).map(function(key) {
                return <li className="list-group-item list-group-item-info"> <Link to="/:serviceName">{lin[key]}</Link></li>
              }.bind(this))
            }
          </ul>
         </nav>
         <Route path="/:serviceName" component={Servdetail}/>
      </div>
    )
  }
}
export default List;
