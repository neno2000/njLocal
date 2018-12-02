import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


function onSelectRow(row, isSelected, e) {
  if (isSelected) {
    alert(`You just selected '${row['name']}'`)
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

class Servdetail extends Component {
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
              ID
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

export default Servdetail;
