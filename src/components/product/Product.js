import React, {Component} from 'react';
import TextAreaFieldGroup from "../comman/TextAreaInputGroup";
import {Link} from "react-router-dom";
import {getProduct} from "../../actions/productAction";
import {connect} from "react-redux";
import PropTypes from "prop-types"
import isEmpty from "../../validation/is-empty";
import {addFeedback, getFeedback} from "../../actions/feedbackAction";
import {addToBasket} from "../../actions/basketAction";
import {url} from "../../utils/env";

class Product extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getProduct(this.props.match.params.id, this.props.history);
            this.props.getFeedback(this.props.match.params.id)
        }
    }

    state = {
        amount: 1,
        message: "",
        error: ""
    }

    onClick(id) {
        let product = {
            productId: id
        }
        this.props.addToBasket(product, this.props.history);
    }

    onChange(e) {

        this.setState({[e.target.name]: (e.target.value)});
    }

    addFeedback(productId) {
        let message = this.state.message;
        if (isEmpty(message)) {
            this.setState({error: "Maydonni to`ldirishingiz kerak."})
        } else {
            const data = {
                id: productId,
                message: message
            }
            this.setState({
                message: ""
            })
            this.props.addFeedback(data, this.props.history)
        }
    }

    render() {
        const {product} = this.props.products;
        const feedback = this.props.feedback;
        let content;
        if (isEmpty(product)) {
            content = <h1>Loading</h1>
        } else {
            let feedbackItem = "";
            if (!isEmpty(feedback)) {
                feedbackItem = (
                    feedback.map(item =>
                        <li className="list-group-item">

                            <div className="feedback-group">
                                <h3 className={"text-info"}>{item.user}</h3>
                            </div>
                            <p className={"ml-3"}>{item.message}</p>
                        </li>)

                )
            }
            content = (
                <div>
                    <div className="row my-4">
                        <div className="col-md col-sm-12">
                            <img src={url + "/api/attach/preview/" + product.attachments[0].id}
                                 alt="this is a product images" className="img-fluid"/>
                        </div>
                        <div className="col-md col-sm-12">
                            <h4><b>Title: {product.title}</b></h4>
                            <h5 className="text-muted"><b> Price: {product.price} $ </b></h5>
                            <p>Desciption: {product.description}</p>
                            <ul className="list-group list-group-flush my-3">
                                {Object.keys(product.aboutMoreProduct).map((key) =>
                                    <li className="list-group-item">{key}: {product.aboutMoreProduct[key]}</li>
                                )}
                            </ul>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Amount</span>
                                </div>
                                <input type="number" name="amount" className="form-control" defaultValue={1}
                                       onChange={event => this.onChange(event)}/>
                            </div>
                            <Link className="btn btn-info btn-block"
                                  to={`/order/${product.id}?amount=${this.state.amount}`}>Buy</Link>
                            <button onClick={this.onClick.bind(this, product.id)}
                                    className="btn btn-danger btn-block">Add to basket
                            </button>


                        </div>
                    </div>
                    <div className="">

                        <div className="col-md-12">
                            <h6>Feedback</h6>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="Product to feedback"
                                    value={this.state.message}
                                    name="message"
                                    onChange={(e) => this.onChange(e)}
                                    error={this.state.error}
                                />
                            </div>
                            <button onClick={this.addFeedback.bind(this, product.id)} type="submit"
                                    className="btn btn-dark">
                                Submit
                            </button>


                        </div>
                        <div className="col-md-12">
                            <ul className="list-group list-group-flush my-3">
                                {feedbackItem}
                            </ul>
                        </div>
                    </div>
                </div>
            )

        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

Product.protoType = {
    getProduct: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    feedback: PropTypes.array,
    getFeedback: PropTypes.func.isRequired,
    addFeedback: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    products: state.products,
    feedback: state.feedback
})

export default connect(
    mapStateToProps,
    {
        getProduct,
        getFeedback,
        addToBasket,
        addFeedback
    }
)(Product);