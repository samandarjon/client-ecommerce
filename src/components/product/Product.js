import React, {Component} from 'react';
import images from "./ssd.jpg"
import TextAreaFieldGroup from "../comman/TextAreaInputGroup";
import {Link} from "react-router-dom";
import {getProduct} from "../../actions/productAction";
import {connect} from "react-redux";
import PropTypes from "prop-types"

class Product extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getProduct(this.props.match.params.id, this.props.history);
        }
    }

    state = {
        "amount": 0,
        "message": ""
    }


    onChange(e) {
        console.log(e.target.value)
        this.setState({[e.target.name]: (e.target.value)});
    }

    render() {

        return (
            <div>
                <div className="row my-4">
                    <div className="col-md col-sm-12">
                        <img src={images} alt="this is a product images" className="img-fluid"/>
                    </div>
                    <div className="col-md col-sm-12">
                        <h4><b>Title: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ex magnam
                            minima
                            nihild
                            obcaecati quod, ratione. Hic minima nesciunt reprehenderit!</b></h4>
                        <h5 className="text-muted"><b> Price: 100 $ </b></h5>
                        <p>Desciption: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut beatae esse
                            explicabo id ipsam libero, officia perspiciatis quibusdam tenetur.</p>
                        <ul className="list-group list-group-flush my-3">
                            <li className="list-group-item">Storge: 64GB</li>
                            <li className="list-group-item">Display Size: 12</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Amount</span>
                            </div>
                            <input type="number" name="amount" className="form-control" defaultValue={0}
                                   onChange={event => this.onChange(event)}/>
                        </div>
                        <Link className="btn btn-info btn-block" to="/order/product_id">Buy</Link>
                        <button className="btn btn-danger btn-block">Add to basket</button>


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
                                error={this.state.message}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Submit
                        </button>


                    </div>
                    <div className="col-md-12">
                        <ul className="list-group list-group-flush my-3">
                            <li className="list-group-item">
                                <div className="feedback-group">
                                    <img src={images} width="80px" className="img-fluid img"/>
                                    <h6>Samandar Akbarov</h6>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, maiores?</p>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Product.protoType = {
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(
    mapStateToProps,
    {
        getProduct
    }
)(Product);