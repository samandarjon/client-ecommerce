import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Moment from "react-moment"
import {Link, withRouter} from "react-router-dom";
import {deleteOwnProduct, getOwnProducts} from "../../../actions/productAction";
import isEmpty from "../../../validation/is-empty";

class ManageProducts extends Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        const {user} = this.props.auth;
        this.props.getOwnProducts(user.sub);
    }

    onDeleteProduct(id) {
        const {user} = this.props.auth;
        this.props.deleteOwnProduct(id,user.sub );
    }


    render() {
        const {products} = this.props.products;
        let productItems = ""
        if (!isEmpty(products)) {
            productItems = products.content.map((product, index) =>
                <tr key={product.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td><Moment format="YYYY/MM/DD">{product.createdAt}</Moment></td>
                    <td colSpan={1}>
                        <button onClick={event => this.onDeleteProduct(product.id)}
                                className={"btn btn-danger btn-block"}> Delete
                        </button>
                    </td>
                    <td>
                        <Link to={`/update-product/${product.id}`} className={"btn btn-info btn-block"}> Update</Link>
                    </td>
                </tr>
            )
        }


        return (
            <div className={"row "}>
                <div className=" offset-1 col-md-10">
                    <h3 className={"mx-5 my-4"}> Products</h3>
                    <Link className={"btn btn-info mb-3"} to={"/add-product"}> Add product</Link>
                    <table className="table table-hover text-center">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price($)</th>
                            <th scope="col">Time(YYYY/MM/DD)</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productItems}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

ManageProducts.propTypes = {
    getOwnProducts: PropTypes.func.isRequired,
    deleteOwnProduct: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    products: state.products,
    auth: state.auth
})


export default connect(mapStateToProps, {getOwnProducts, deleteOwnProduct})(withRouter(ManageProducts));