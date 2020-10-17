import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {logoutUser} from "../../actions/authActions";
import axios from "axios"
import {deleteBasketItem, getBasketItem} from "../../actions/basketAction";
import {connect} from "react-redux";
import isEmpty from "../../validation/is-empty";

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    constructor() {
        super();
        this.state = {
            categories: []
        }
        axios.get("/api/categories")
            .then(res => {
                this.setState({categories: res.data._embedded.categories})
            }).catch(error => console.log(error.response))
    }

    componentDidMount() {
        const {isAuthenticated} = this.props.auth;
        if (isAuthenticated)
            this.props.getBasketItem()
    }

    onClickDeleteBasketItem(id) {
        this.props.deleteBasketItem(id);
        console.log(id)
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {items} = this.props.baskets;
        let list;
        if (isEmpty(items)) {
            list = []
        } else {
            list = items;
        }
        const authLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-shopping-basket"/> <span>{isEmpty(list) ? 0 : list.length}</span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <div className="list-group w-10"> {list.map(item =>
                            (<div className="basket">
                                    <Link to={"/product/" + item.product.id}
                                          className="list-group-item list-group-item-action basket-item">
                                        <div className="d-flexjustify-content-between">
                                            <p className="mb-1">{item.product.title}</p>
                                        </div>
                                        <small className="mb-1 ">{item.product.description}</small>

                                    </Link>
                                    <button className="btn btn-danger basket-times"
                                            onClick={this.onClickDeleteBasketItem.bind(this, item.id)}>
                                        <i className="fas fa-times"
                                        /></button>
                                </div>
                            )
                        )}
                        </div>
                    </div>

                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Account
                    </a>
                    <div className="dropdown-menu mr-5" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item list" to="/addresses"><i className="fas fa-map-marker-alt"/>Address</Link>
                        <Link className="dropdown-item list" to={"/chat"}><i className="fas fa-comments"/> Chat</Link>
                        <Link className="dropdown-item list" to={"/products"}><i
                            className="fas fa-clipboard-list"/> Products</Link>
                        <Link className="dropdown-item list" to={"/orders"}><i
                            className="fas fa-shopping-cart"/> Orders</Link>
                        <button
                            onClick={this.onLogoutClick.bind(this)}
                            className="nav-link logout list"
                        >
                            <i className="fas fa-sign-out-alt"/>
                            Log out
                        </button>
                    </div>

                </li>
            </ul>
        );
        const guestLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to={"/"}>Ecommerce</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {this.state.categories
                                    .map(category => <Link className="dropdown-item"
                                                           to={"/product/" + category.id}>{category.name}</Link>)
                                }
                            </div>
                        </li>

                    </ul>


                    {isAuthenticated ? authLink : guestLink}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    getBasketItem: PropTypes.func.isRequired,
    baskets: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    auth: state.auth,
    baskets: state.baskets
});
export default connect(
    mapStatetoProps,
    {
        logoutUser,
        getBasketItem,
        deleteBasketItem
    }
)(Navbar);
