import React from 'react';
import { Link as Link1 } from 'react-router-dom';
import config from 'react-global-configuration';
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
      let sap_client = "100";    // use 100 as default
      let sap_in_pro = process.env.REACT_APP_SAP_CLIENT;
      console.log("Hello");
      console.log(sap_in_pro);
      if(sap_in_pro){
        sap_client = sap_in_pro;
      }
      const targetUrl = config.get('rfcJsonAdapter') + '?action=exposed_fm&sap-client='
          + sap_client;
      console.log(targetUrl);
      fetch(targetUrl)
          .then(res => res.json())
          .then(rfcList => this.setState({ rfcList }));
  }
  render() {
      const { rfcList } = this.state;
      var lin = [];
      for (var x in rfcList) {
          if (rfcList.hasOwnProperty(x)) {
            lin.push(rfcList[x].funcname);
          }
      }
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
              <div className="col-xs-12 top-padding">
                  <h3>Json Enabled Function Modules</h3>
                  <ul className="col-xs-12 top-padding no-pad-lr">
                      {
                          Object.keys(lin).map(function (key, index) {
                              return <li key={index} className="list-group-item"> <Link1 to={"jsonrfc/"+lin[key]}>{lin[key]
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
