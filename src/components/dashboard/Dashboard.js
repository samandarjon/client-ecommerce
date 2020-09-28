import React, {Component} from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import './custom.css'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getOwnOrders} from "../../actions/orderAction";

class Dashboard extends Component {

    render() {
        return (
            <div> Dashboard</div>
        );
    }
}

export default connect(null, {
    getOwnOrders
})
(withRouter(Dashboard));