/* Import statements */
import React, { Component } from 'react';
import { Link as Link1 , Link as Link2, Route } from 'react-router-dom';
import Servdetail from './Servdetail';
import RfcList from './RfcList';

/* App component */
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            location: props.location.pathname
        }
        console.log(this.state.location);
    }


    // Fetch the list on first mount
    componentDidMount() {
        this.getList();
    }

    // Retrieves the list of items from the Express app
    getList = () => {
        fetch('/metadata/services')
            .then(res => res.json())
            .then(list => this.setState({ list }));
    }

    render() {
        const { list } = this.state;
        console.log(list);
        var lin = [];
        for (var x in list) {
            if (list.hasOwnProperty(x)) {
                console.log(x);
                lin.push(x);
            }
        }
        return (
            <div>
                <div className="col-xs-12 top-padding">
                    <h3>Available Services</h3>
                    <ul className="col-xs-12 top-padding no-pad-lr">
                        {
                            Object.keys(lin).map(function (key, index) {
                                return <li key={index} className="list-group-item"> <Link1 to={lin[key]}>{lin[key]
                                }</Link1></li>;
                            })
                        }
                    </ul>
                </div>
                <div className="col-xs-12">
                    <h5></h5>
                    <ul className="col-xs-12 top-padding no-pad-lr">
                        <li className="list-group-item">
                            <Link2 to='/jsonrfc' key={0}>jsonRfcAdapter</Link2>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default List;
