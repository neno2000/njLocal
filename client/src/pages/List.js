import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class List extends Component {
  // Initialize the state
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

  return (
    <div className="App">
      <h2>Services</h2>
        <BootstrapTable data={list} striped hover>
            <TableHeaderColumn isKey dataField='service'>Rest Service</TableHeaderColumn>
            <TableHeaderColumn dataField='host'>Target Host</TableHeaderColumn>
        </BootstrapTable>
    </div>
    );
}
}

export default List;
