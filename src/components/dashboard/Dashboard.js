import React, {Component} from 'react';
import {Menu, MenuItem, ProSidebar, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './custom.css'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getOwnOrders} from "../../actions/orderAction";

class Dashboard extends Component {
    state = {
        product: false,
        order: true,
        collapsed: false
    }

    productClick() {
        this.setState({
            product: true,
            order: false,
        })

    }


    onOrderClick() {
        this.setState({
            product: false,
            order: true,
        })
    }

    toggle() {
        this.setState({collapsed: !this.state.collapsed})
    }

    render() {
        let content = "";
        if (this.state.product)
            content = (<p>Product</p>)
        if (this.state.order)
            content = (<p>Order</p>)
        return (

            <div className="d-flex">
                <ProSidebar collapsed={this.state.collapsed}>
                    <SidebarHeader>
                        <div
                            style={{
                                padding: '0 24px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <button className="sidebar-button" onClick={event => this.toggle()}><i
                                className="fas fa-bars"/> Dashboard
                            </button>
                        </div>
                    </SidebarHeader>
                    <Menu iconShape="square">
                        <MenuItem>
                            <button onClick={event => this.productClick()}>product</button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={event => this.onOrderClick()}>Order</button>
                        </MenuItem>
                    </Menu>
                </ProSidebar>
                {content}
            </div>
        );
    }
}

export default connect(null, {
    getOwnOrders
})
(withRouter(Dashboard));