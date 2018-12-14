import React, { Component } from 'react';
//import ParamTable from './ParamTable';
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class ParamTable extends Component {
    render() {
        const listItems = this.props.paraMeters.map((p, index) =>
            <tr key={index}>
                <td>
                    {p.name}
                </td>
                <td>
                    {p.type}
                </td>
                <td>
                    {p.obligatory.toString()}
                </td>
            </tr>
        );
        if (this.props.paraMeters.length) {
            console.log(this);
            return (<table className="ik-tbl-default">
                <thead>
                    <tr>
                        <td>Namn</td>
                        <td>Typ</td>
                        <td>Obligatorisk</td>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
            );
        } else {
            return ("");
        }
    }
}

class Servdetail extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.targService = "/metadata/services?service=" + props.location.pathname;
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
        //  console.log(this.targService);
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
        //  console.log(allParams);

        return (
            <div className="col-xs-12 col-xs-12 bottom-padding">
                <title>bla bla</title>
                <h3>Service Repository</h3>
                <div className="">
                    <h5>Detaljerad beskrivning av tjänsten</h5>
                    <h4>{data}</h4>
                </div>

                <div className="col-xs-12 top-padding bottom-padding no-pad-lr">
                    <ul>
                        <li className="list-group-item list-group-item-info">Funktionalitet: {service.description}</li>
                        <li className="list-group-item list-group-item-info">Exekveringsserver: {service.host}</li>
                        <li className="list-group-item list-group-item-info">Metod: {service.method}</li>
                    </ul>
                </div>
                <h4>Parametrar</h4>
                <ParamTable paraMeters={allParams} />
            </div>
        );
    }
}
export default Servdetail;
