import React, {Component} from 'react';
import isEmpty from "../../../validation/is-empty";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import SelectListGroup from "../../comman/SelectListGroup";

class OrderItem extends Component {
    constructor() {
        super();
        this.state = {
            orderType: ""
        }

    }


    onChange(e, id) {
        const updateOrder = {
            orderType: e.target.value
        }
        this.props.update(updateOrder, id)
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {consumer, seller} = this.props;
        let orderList = "Not Found"

        if (!isEmpty(consumer)) {
            orderList = consumer.content.map((order, index) =>
                <tr key={order.id}>
                    <td scope="row">{"c " + order.id}</td>
                    <td><Link to={"/product/" + order.product.id}>{order.product.title}</Link></td>
                    <td>{order.amount}</td>
                    <td>{order.address.city + " " + order.address.home}</td>
                    <td>{order.orderType}</td>
                    <td><Moment format="YYYY/MM/DD">{order.createdAt}</Moment></td>
                    <td><Link to={"/message"}><i className="fas fa-comments"/></Link></td>
                </tr>
            )
        }
        if (!isEmpty(seller)) {
            orderList = seller.content.map((order, index) =>
                <tr key={order.id}>
                    <td scope="row">{"s " + order.id}</td>
                    <td><Link to={"/product/" + order.product.id}>{order.product.title}</Link></td>
                    <td>{order.amount}</td>
                    <td>{order.address.city + " " + order.address.home}</td>
                    <td><SelectListGroup
                        onChange={(e) => this.onChange(e, order.id)}
                        options={["COMPLETE", "REJECTED", "NEW", "ACCEPT"]}
                        value={order.orderType}
                        name={"orderType"}/>
                    </td>
                    <td><Moment format="YYYY/MM/DD">{order.createdAt}</Moment></td>
                    <td><Link to={"/message"}><i className="fas fa-comments"/></Link></td>
                </tr>
            )

        }
        return (
            <div className={"text-center"}>
                <table className="table table-hover text-center">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Address</th>
                        <th scope="col">Time(YYYY/MM/DD)</th>
                        <th scope="col">OrderType</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OrderItem;