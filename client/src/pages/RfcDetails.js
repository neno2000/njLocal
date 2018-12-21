import React, { Component } from 'react';
import config from 'react-global-configuration';
import configuration from './../config';

//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class RfcDetails extends React.Component {
  constructor(props) {
      super(props);
      config.set(configuration, { freeze: false });

      console.log(props);
      this.targService =  props.location.pathname;
      this.state = {
          service: {},
          params: []
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
        console.log("NENO NENO");
        console.log(this.targService);
      fetch(this.targService)
          .then(res => res.json())
          .then(service => this.setState({ service, isLoading: false }));
  }

  render() {
      const service = this.state.service;
      let parameters = "";
      let allParams = [];
      parameters = service.params ? service.params.inbound : {};
      if (parameters) {
          if (parameters.length) {
              parameters.map(function (item, index) {
                  item.key = index;
                  allParams.push(item);
              });
          }

      }
      const { data } = this.state.data;

      return (
          <div>
              <div className="col-xs-12 top-padding u-case">
                  <ul className="list-inline">
                      <li>
                          <span className="glyphicon glyphicon-chevron-left"></span>
                      </li>
                      <li>
                          <a className="" href="/">Tillbaka</a>
                      </li>
                  </ul>

              </div>
              <div className="col-xs-12 col-xs-12 bottom-padding">
                  <title>bla bla</title>
                  <h3>Json Enable Function</h3>
                  <div className="top-padding">
                      <p>Detaljerad beskrivning for FM:</p>
                      <p className="u-case f-bold">{data}</p>
                  </div>

                  <div className="col-xs-12 top-padding bottom-padding no-pad-lr">
                      <ul className="col-xs-12 no-pad-lr">
                          <li className="list-group-item">Funktionalitet: {service.description}</li>
                          <li className="list-group-item">Exekveringsserver: {service.host}</li>
                          <li className="list-group-item">Metod: {service.method}</li>
                      </ul>
                  </div>


              </div>
          </div>
      );
  }
}
export default RfcDetails;
