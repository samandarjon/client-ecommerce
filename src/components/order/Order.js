import React, {Component} from 'react';
import SelectListGroup from "../comman/SelectListGroup";
import isEmpty from "../../validation/is-empty";
import {connect} from "react-redux";
import {addOrder} from "../../actions/orderAction";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types"
import {getAddress} from "../../actions/addressAction";

class Order extends Component {
    constructor(props) {
        super(props);
        let amount = this.props.location.search;
        amount = amount.substring(amount.indexOf("=") + 1)
        this.state = {
            productId: this.props.match.params.id,
            amount: amount,
            address: "",
            error: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getAddress();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        let {addresses} = this.props.addresses;
        e.preventDefault();

        let order = {
            productId: this.state.productId,
            amount: this.state.amount,
            addressId: this.state.address
        }
        if (addresses.length === 0 || isEmpty(addresses)) {
            this.setState({error: "Iltimos addressni hosil qiling."})
            return;
        }
        if (isEmpty(order.addressId)) {
            order.addressId = addresses[0].id
        }
        console.log(order.addressId)
        this.props.addOrder(order, this.props.history);
    }

    render() {
        let {addresses} = this.props.addresses;
        if (addresses.length === 0 || isEmpty(addresses)) {
            addresses = []
        }
        let {product} = this.props
        let content = (<h1>Loading</h1>)
        if (!isEmpty(product)) {
            content = (<div className="card">
                <img className="card-img-top"
                     src={"http://localhost:8080/api/attach/preview/" + product.attachments[0].id}
                     alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><h4 className="text-muted">Price: {product.price + " $"}</h4>
                    </p>
                </div>
            </div>)
        }

        return (
            <div className="">
                <form className="row" onSubmit={this.onSubmit}>
                    <div className="col-md-8 offset-2">
                        <h1>Buyutma berish</h1>
                        <SelectListGroup
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                            options={addresses}
                            info={"Kerakli manzilni tanlang, agar mavjud bolsa yangi yaratishingi kerak."}
                            error={this.state.error}
                        />


                    </div>
                    <div className="col-md-8 offset-2">
                        {content}
                        <input
                            type="submit"
                            value="Buy"
                            className="btn btn-info btn-block mt-4"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

Order.protoType = {
    addresses: PropTypes.array.isRequired,
    products: PropTypes.object.isRequired,
    getAddress: PropTypes.func.isRequired,
    addOrder: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    addresses: state.addresses,
    product: state.products.product
})

export default connect(mapStateToProps, {
    getAddress,
    addOrder
})(withRouter(Order));