import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import axios from "axios"

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
                console.log(res.data._embedded.categories)
                this.setState({categories: res.data._embedded.categories})
            }).catch(error => console.log(error.response))
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Account
                    </a>
                    <div className="dropdown-menu mr-5" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Dashboard</a>
                        <a className="dropdown-item" href="#">My orders</a>
                        <a className="dropdown-item" href="#">Setting</a>
                        <button
                            onClick={this.onLogoutClick.bind(this)}
                            className="nav-link logout"
                        >
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Ecommerce</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" href="#">Home <span
                                className="sr-only">(current)</span></Link>
                        </li>

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
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>

                    </ul>

                    {/*<form className="form-group my-2 my-lg-0">*/}
                    {/*    <div className="input-group mb-3">*/}
                    {/*        <input className="form-control " type="search" placeholder="Search"*/}
                    {/*               aria-label="Search"/>*/}
                    {/*        <div className="input-group-append">*/}
                    {/*            <button className="btn btn-outline-success input-group-appen" type="submit">Search*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                    {isAuthenticated ? authLink : guestLink}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStatetoProps = state => ({
    auth: state.auth
});
export default connect(
    mapStatetoProps,
    {logoutUser}
)(Navbar);
