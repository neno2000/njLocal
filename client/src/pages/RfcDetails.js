import React, { Component, Link as Link } from 'react';
import config from 'react-global-configuration';
//import ParamTable from './ParamTable';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

function onRowSelect(row, isSelected, e) {
    console.log(row);
    console.log(isSelected);
    alert('selected');
    return false;
}
const selectRowProp = {
  mode: 'radio',
  clickToSelect: true,
  onSelect: onRowSelect
};

class RfcDetails extends Component {
  constructor(props) {
      super(props);
      var tClient;
      console.log(props);
      this.targService =  props.location.pathname;
      this.state = {
          service: {},
          params: [],
          types: []
      };
      this.state.data = {
          data: props.location.pathname
      }
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
      let allParams = [];
      let allTypes = [];
    //  parameters = service.params ? service.params.inbound : {};
      allParams = service.params;
      allTypes = service.types;
      console.log(allParams);
      console.log(allTypes);
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
                  <h3>Json Enable Function</h3>
                  <div className="top-padding">
                      <p>Detaljerad beskrivning for FM:</p>
                      <p className="u-case f-bold">{data.substring(data.lastIndexOf('/')+1)}</p>
                  </div>

                  <div className="col-xs-12 top-padding bottom-padding no-pad-lr">
                      <ul className="col-xs-12 no-pad-lr">
                          <li className="list-group-item">Funktionalitet: {service.rfcDescription}</li>
                          <li className="list-group-item">Exekveringsserver: abapHost</li>
                          <li className="list-group-item">Metod: GET & POST</li>
                      </ul>
                  </div>


              </div>
              <div>
                <BootstrapTable data={ allParams } selectRow={ selectRowProp }>
                  <TableHeaderColumn dataField='fielname' isKey>Field Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='fieltype'>Field Type</TableHeaderColumn>
                  <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                  <TableHeaderColumn dataField='direccion'>Direccion</TableHeaderColumn>
                </BootstrapTable>
              </div>

          </div>
      );
  }
}
export default RfcDetails;
