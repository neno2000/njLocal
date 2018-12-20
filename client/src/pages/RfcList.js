import React from 'react';
import { Link as Link1 , Route } from 'react-router-dom';
import config from 'react-global-configuration';
import configuration from './../config';

class RfcList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        rfcList: []
      }
  }
  // Fetch the list on first mount
  componentDidMount() {
      this.getList();
  }
  // Retrieves the list of items from the Express app
  //target url must be replaced by a dynamically selected value
  getList = () => {
      config.set(configuration);
      const targetUrl = config.get('rfcJsonAdapter') + '?action=exposed_fm&sap-client='
      +  config.get('targetClient');
      console.log(targetUrl);
      fetch(targetUrl)
          .then(res => res.json())
          .then(rfcList => this.setState({ rfcList }));
  }
  render() {
      const { rfcList } = this.state;
      console.log(rfcList);
      var lin = [];
      for (var x in rfcList) {
          if (rfcList.hasOwnProperty(x)) {
              console.log(rfcList[x]);
              lin.push(x);
          }
      }
      return (
          <div>
              <div className="col-xs-12 top-padding">
                  <h3>Json Enabled Function Modules</h3>
                  <ul className="col-xs-12 top-padding no-pad-lr">
                      {
                          Object.keys(lin).map(function (key, index) {
                              return <li key={index} className="list-group-item"> <Link1 to={lin[key]}>{lin[key]
                              }</Link1></li>;
                          })
                      }
                  </ul>
              </div>
          </div>
      );
  }
}
export default RfcList;
