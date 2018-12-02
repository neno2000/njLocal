import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Switch, Route } from 'react-router-dom'


function onSelectRow(row, isSelected, e) {
  if (isSelected) {
    console.log(row.key);
    var key = row.key;
    alert(`You just selected '${row['name']}'`)

    const Servdetail = () => (
      <Switch>

        <Route exact path='/:key' component={Servdetail}/>
      </Switch>
    )


  }
}

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true,
  unselectable: [2],
  selected: [1],
  onSelect: onSelectRow,
  bgColor: 'gold'
};

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
  getSelectedRowKeys() {
    //Here is your answer
    console.log(this.refs.table.state.selectedRowKeys)
  }
  render() {
      const { list } = this.state;
      return (
        <div>
          <BootstrapTable data={list}
                          selectRow={selectRowProp}
          >
            <TableHeaderColumn isKey dataField='key'
            >
              key
            </TableHeaderColumn>
            <TableHeaderColumn dataField='name'
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField='target'
            >
              Value
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      )
    }
}

export default List;
