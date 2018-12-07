import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Servdetail extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.targService = "/metadata/services?service=" + props.location.pathname;
    this.state = {
      service: {}
    }
    this.state.data = {
      data: props.location.pathname
    }
    this.state.params = {
      params : {}
    }

    this.state.inbound = {
      inbound : {}
    }


  }
  // Fetch the list on first mount
  componentDidMount() {
    this.getService();
  }


  // Retrieves the list of items from the Express app
  getService = () => {
  //  console.log(this.targService);
    fetch(this.targService)
    .then(res => res.json())
    .then(service => this.setState({ service}))
  }
  render() {
      const { service } = this.state;
      const { data } = this.state.data;
      console.log( "Ernesto" );
      console.log(service);
      var lin = [];
      for (var x in this.state.params){
        console.log(x);
        lin.push(x);
      }
      console.log("fadsfa");
      console.log(lin);
      return (
        <div>
           <title>bla bla</title>
           <h1>Service Repository</h1>
           <h2>Detaljerad beskrivning for tjänsten: {data}</h2>
           <li className="list-group-item list-group-item-info">Funktionalitet: {service.description}</li>
           <li className="list-group-item list-group-item-info">Exekveringsserver: {service.host}</li>
           <div>
           {
             Object.keys(lin).map(function(key) {
               return <li className="list-group-item list-group-item-info">{lin[key]}</li>})
           }
           </div>
        </div>
      )
    }
}
export default Servdetail;
