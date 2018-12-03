import React, { Component } from 'react';

class Servdetail extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.targService = "/metadata/services" + props.location.pathname;
    console.log("hello x");
    console.log(props.location.pathname);
    this.state = {
      service: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getService();
  }

  // Retrieves the list of items from the Express app
  getService = () => {
    console.log(this.targService);
    fetch(this.targService)
    .then(res => res.json())
    .then(service => this.setState({ service }))
  }

  render() {
      console.log(this.state);
      const { service } = this.state;
      return (
        <div>
        </div>
      )
    }
}

export default Servdetail;
