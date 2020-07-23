import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TextFieldGroup from "../comman/TextFieldGroup";
import {loginUser} from "../../actions/authActions";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            username: "",
            password: "",
            errors: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.loginUser(userData);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your DevConnector account
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Username"
                                    name="username"
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    error={errors.username ? errors.username : errors.message}
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);
