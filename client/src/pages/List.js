/* Import statements */
import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Servdetail from './Servdetail';
import RfcList from './RfcList';

/* App component */
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            redirect: false
        }
    }
    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/jsonrfc' />
      }
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
            <div className="col-xs-12 top-padding">
                <h3>Available Services</h3>
                    <ul className="col-xs-12 top-padding no-pad-lr">
                        {
                            Object.keys(lin).map(function (key, index) {
                                return <li key={index} className="list-group-item"> <Link to={lin[key]}>{lin[key]
                                }</Link></li>;
                            })
                        }
                    </ul>
                <footer>
                    <p><Link to='/jsonrfc'>jsonRfcAdapter</Link></p>
               </footer>
            <Route path="/:servicedetail" component={Servdetail} />
            <Route exact path="/jsonrfc" component={RfcList} />
           </div>
        );
    }
}
export default List;
