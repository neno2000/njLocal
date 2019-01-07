import React, { Component } from 'react';
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
            return (<div>
                <h4>Parametrar</h4>
                <table className="ik-tbl-default">
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
            </div>
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
        console.log(this.targetService);
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
                    <h3>Service Repository</h3>
                    <div className="top-padding">
                        <p>Detaljerad beskrivning av tjänsten</p>
                        <p className="u-case f-bold">{data}</p>
                    </div>

                    <div className="col-xs-12 top-padding bottom-padding no-pad-lr">
                        <ul className="col-xs-12 no-pad-lr">
                            <li className="list-group-item">Funktionalitet: {service.description}</li>
                            <li className="list-group-item">Exekveringsserver: {service.host}</li>
                            <li className="list-group-item">Metod: {service.method}</li>
                        </ul>
                    </div>

                    <ParamTable paraMeters={allParams} />
                </div>
            </div>
        );
    }
}
export default Servdetail;
