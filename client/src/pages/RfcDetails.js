import React, { Component, Link as Link } from 'react';
import config from 'react-global-configuration';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
class RfcDetails extends Component {
  constructor(props) {
      super(props);
      console.log(props);
      this.targService =  props.location.pathname;
      this.state = {
          service: {},
          isOpen: false ,
          params: [],
          types: []
      };
      this.state.data = {
          data: props.location.pathname
      }
  }
  toggleModal = () => {
  this.setState({
    isOpen: !this.state.isOpen
  });
}
  // Fetch the list on first mount
  componentDidMount() {
      this.getService();
      console.log("data fetched");
  }
  // Retrieves the list of items from the Express app
  getService = () => {
      console.log(this.targService);
      let fm = this.targService.split("/");
      let rfcMedatadata = config.get('rfcJsonAdapter') + "/" + fm[2] + "?action=metadata&sap-client=" + config.get('targetClient');
      fetch(rfcMedatadata)
          .then(res => res.json())
          .then(service => this.setState(
            { service, isLoading: false }));
  }
  render() {
      const service = this.state.service;
      const { data } = this.state.data;
      console.log(service);
      return (
          <div>
              <div className="col-xs-12 top-padding u-case">
                  <ul className="list-inline">
                      <li>
                          <span className="glyphicon glyphicon-chevron-left"></span>
                          <a className="" href="/jsonrfc">Tillbaka</a>
                      </li>
                  </ul>
              </div>
              <div className="col-xs-12 col-xs-12 bottom-padding">
                  <title>Json Adapter</title>
                  <h3>Json Enabled Function Module</h3>
                  <div className="top-padding">
                      <p>Detaljerad beskrivning for FM:</p>
                      <p className="u-case f-bold">{data.substring(data.lastIndexOf('/')+1)}</p>
                  </div>
                  <div className="col-xs-12 top-padding bottom-padding no-pad-lr">
                      <ul className="col-xs-12 no-pad-lr">
                          <li className="list-group-item">Funktionalitet: {service.rfcDescription} , Exekveringsserver: abapHost, Supported actions GET & POST   === Parameters: </li>
                      </ul>
                  </div>
              </div>
              <div>
                <BootstrapTable tableBodyClass='ik-tbl-default' data={ service.params } >
                  <TableHeaderColumn  dataField='fielname' isKey>Field Name</TableHeaderColumn>
                  <TableHeaderColumn  dataField='fieltype'>Field Type</TableHeaderColumn>
                  <TableHeaderColumn  dataField='description'>Description</TableHeaderColumn>
                  <TableHeaderColumn  dataField='direccion'>Direccion</TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="col-xs-12 top-padding bottom-padding no-pad-lr">
                  <ul className="col-xs-12 no-pad-lr">
                      <li className="list-group-item">Funktionalitet: {service.rfcDescription} , Exekveringsserver: abapHost, Supported actions GET & POST   === Types:</li>
                  </ul>
              </div>
              <div>
                <BootstrapTable tableBodyClass='ik-tbl-default' data={ service.types } >
                  <TableHeaderColumn dataField='fielname' isKey filter={ { type: 'TextFilter', delay: 1000 } }>Field Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='fieltype'>Field Type</TableHeaderColumn>
                  <TableHeaderColumn dataField='description' >Description</TableHeaderColumn>
                  <TableHeaderColumn dataField='datatype' filter={ { type: 'TextFilter', delay: 1000 } }>Data Type</TableHeaderColumn>
                  <TableHeaderColumn dataField='length'>Data Length</TableHeaderColumn>
                </BootstrapTable>
              </div>
          </div>
      );
  }
}
export default RfcDetails;
