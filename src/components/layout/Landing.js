import React, {Component} from 'react';
import ProductItem from "../product/ProductItem";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProducts, getProductsByCategory} from "../../actions/productAction";
import isEmpty from "../../validation/is-empty";
import {addToBasket} from "../../actions/basketAction";
import {Pagination} from "semantic-ui-react";

// import {Pagination} from "semantic-ui-react";

class Landing extends Component {
    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let category = params.get('category');
        if (category === null || category === undefined)
            category = "all"
        this.props.getProductsByCategory(0, category)
    }

    onChange = (event, page) => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let category = params.get('category');
        if (category === null || category === undefined)
            category = "all"
        if (category === "all")
            this.props.getProducts(page.activePage - 1);
        else this.props.getProductsByCategory(page.activePage - 1, category)
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
            if (products.content.length <= 0) {
                productContent = (<h1>Hali bu kategoriya bo`yicha mahsulot mavjud emas</h1>)
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
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-deck mt-2">
                            <div className="card-columns">
                                {productContent}

                            </div>
                            <Pagination defaultActivePage={0} onPageChange={this.onChange}
                                        totalPages={products.totalPages}/>
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
    getProductsByCategory: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    errors: PropTypes.object,
    basket: PropTypes.object

}
const mapStateToProps = state => ({
    products: state.products,
    errors: state.errors,
    baskets: state.baskets
})

export default connect(mapStateToProps, {getProducts, addToBasket, getProductsByCategory})(Landing);