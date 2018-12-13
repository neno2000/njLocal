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
            return (<table>
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

    //renderRow = (item, i) => {
    //    return (
    //        <TableRow key={item.name + i + item.type} />
    //    );
    //}

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
        // this.state.params = service.params;

        console.log(allParams);

        // service.params.map(function (item, index) {
        //     console.log("PArams " + item.params);
        // });
        const { inbound } = service;
        //  console.log(inbound);

        return (
            <div>
                <title>bla bla</title>
                <h1>Service Repository</h1>
                <h2>Detaljerad beskrivning for tjänsten: {data}</h2>
                <ul>
                    <li className="list-group-item list-group-item-info">Funktionalitet: {service.description}</li>
                    <li className="list-group-item list-group-item-info">Exekveringsserver: {service.host}</li>
                </ul>
                <ParamTable paraMeters={allParams} />
            </div>

        );
    }
}
export default Servdetail;
