import React, {Component} from 'react';
import OrderItem from "./OrderItem";
import {getOrderOfSeller, getOwnOrders, updateOrder} from "../../../actions/orderAction";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types"
import {Pagination} from "semantic-ui-react";

class ManageOrders extends Component {
    componentDidMount() {
        this.props.getOrderOfSeller();
        this.props.getOwnOrders();
    }

    onPageChange(e, d) {
        this.props.getOrderOfSeller(d.activePage)
    }

    onPageChangeConsumer(e, d) {
        this.props.getOwnOrders(d.activePage)
    }


    render() {
        const {consumer, seller} = this.props.orders;
        let a = "Loading"
        let b = "Loading"
        if (consumer !== undefined) {
            b = (<div>

                <OrderItem consumer={consumer}/>
                <Pagination defaultActivePage={0} totalPages={consumer.totalPages}
                            onPageChange={(event, data) => this.onPageChangeConsumer(event, data)}/>
            </div>)
        }
        if (seller !== undefined) {
            a = (<div>
                    <OrderItem seller={seller} update={this.props.updateOrder}/>
                    <Pagination defaultActivePage={0} totalPages={seller.totalPages}
                                onPageChange={(event, data) => this.onPageChange(event, data)}/>
                </div>
            )
        }
        return (
            <div className={"row"}>
                <div className="col-md-12 my-3">
                    <h3>Received order</h3>
                    {a}
                </div>
                <div className="col-md-12">
                    <h3>Your orders</h3>
                    {b}
                </div>


            </div>
        );
    }
}

ManageOrders.propTypes = {
    orders: PropTypes.object.isRequired,
    getOrderOfSeller: PropTypes.func.isRequired,
    getOwnOrders: PropTypes.func.isRequired,
    updateOrder: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    orders: state.orders
})
export default connect(mapStateToProps, {getOwnOrders, getOrderOfSeller, updateOrder})(withRouter(ManageOrders));