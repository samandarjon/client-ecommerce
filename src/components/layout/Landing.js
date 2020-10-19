import React, {Component} from 'react';
import ProductItem from "../product/ProductItem";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProducts} from "../../actions/productAction";
import isEmpty from "../../validation/is-empty";
import {addToBasket} from "../../actions/basketAction";

class Landing extends Component {
    componentDidMount() {
        this.props.getProducts()
    }

    onClick(id) {
        let product = {
            productId: id
        }
        this.props.addToBasket(product, this.props.history);
    }

    render() {
        const {products, loading} = this.props.products;
        let productContent;
        if (!loading) {
            productContent = (<h1>Loading</h1>)
        } else {
            productContent = products.content.map(product =>
                <ProductItem
                    title={product.title} description={product.description}
                    price={product.price} id={product.id}
                    img={!isEmpty(product.attachments.length > 0 && !isEmpty(product.attachments[0].id)) ? product.attachments[0].id : ""
                    }
                    addBasket={this.onClick.bind(this, product.id)}

                />
            )
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-deck mt-2">
                            <div className="card-columns">
                                {productContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.protoType = {
    addToBasket: PropTypes.func,
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    errors: PropTypes.object,
    basket: PropTypes.object

}
const mapStateToProps = state => ({
    products: state.products,
    errors: state.errors,
    baskets: state.baskets
})

export default connect(mapStateToProps, {getProducts, addToBasket})(Landing);