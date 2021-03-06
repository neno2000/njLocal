import React, { Component } from 'react';
import { Link as Link2 } from "react-router-dom";
import config from 'react-global-configuration';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class RfcDetails extends Component {
    constructor(props) {
        super(props);
        this.targService = props.location.pathname;
        this.state = {
            service: {}
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
    }
    // Retrieves the list of items from the Express app
    getService = () => {
        let fm = this.targService.split("/");
        let sap_client = "100";    // use 100 as default
        if (process.env.REACT_APP_SAP_CLIENT) {
            sap_client = process.env.REACT_APP_SAP_CLIENT;
        }
        let rfcMedatadata = config.get('rfcJsonAdapter') + "/" + fm[2] + "?action=metadata&sap-client=" + sap_client;
        console.log(rfcMedatadata);
        fetch(rfcMedatadata)
            .then(res => res.json())
            .then(service => this.setState(
                { service, isLoading: false }));
    }
    render() {
        const service = this.state.service;
        const { data } = this.state.data;
        return (
            <div>
                <div className="col-xs-12 top-padding u-case">
                    <ul className="list-inline">
                        <li>
                            <span className="glyphicon glyphicon-chevron-left"></span>
                        </li>
                        <li>
                            <Link2 to="/jsonrfc">Tillbaka</Link2>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-xs-12 bottom-padding">
                    <title>Json Adapter</title>
                    <h3>Json Enabled Function Module</h3>
                    <div className="top-padding">
                        <p>Detaljerad beskrivning for FM:</p>
                        <p className="u-case f-bold">{data.substring(data.lastIndexOf('/') + 1)}</p>
                    </div>
                    <div className="col-xs-12 top-padding bottom-padding no-pad-lr">
                        <ul className="col-xs-12 no-pad-lr">
                            <li className="list-group-item">Funktionalitet: {service.rfcDescription} , Exekveringsserver: abapHost, Supported actions: GET & POST  Function Module Parameters: </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="col-xs-12">
                        <BootstrapTable tableBodyClass='ik-tbl-default' data={service.params} >
                            <TableHeaderColumn width='200px' dataField='fielname' isKey>Field Name</TableHeaderColumn>
                            <TableHeaderColumn width='200px' dataField='fieltype'>Field Type</TableHeaderColumn>
                            <TableHeaderColumn width='200px' dataField='description'>Description</TableHeaderColumn>
                            <TableHeaderColumn width='200px' dataField='direccion'>Direccion</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                    <div className="col-xs-12 top-padding bottom-padding">
                        <ul className="col-xs-12 no-pad-lr">
                            <li className="list-group-item">Deep into the details of the function module, Target service: {data.substring(data.lastIndexOf('/') + 1)} by checking the Parameters Type:</li>
                        </ul>
                    </div>
                    <div className="col-xs-12">
                        <BootstrapTable tableBodyClass='ik-tbl-default' data={service.types} >
                            <TableHeaderColumn dataField='fielname' width='200px' isKey filter={{ type: 'TextFilter', delay: 1000 }}>Field Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='fieltype' width='150px'>Field Type</TableHeaderColumn>
                            <TableHeaderColumn dataField='description' width='200px' >Description</TableHeaderColumn>
                            <TableHeaderColumn dataField='datatype' width='50px'>Data Type</TableHeaderColumn>
                            <TableHeaderColumn dataField='length' width='50px'>Data Length</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        );
    }
}
export default RfcDetails;
