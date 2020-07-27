import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";
import TextFieldGroup from "../comman/TextFieldGroup";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            password2: "",
            phoneNumber: "",
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
            password2: this.state.password2

        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your ecommerce account
                            </p>
                            {errors.message && <p className="text-danger">{errors.message}</p>}
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="Phone number"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChange}
                                    error={errors.phoneNumber}/>
                                <TextFieldGroup
                                    placeholder="First name"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.onChange}
                                    error={errors.firstName}
                                />
                                <TextFieldGroup
                                    placeholder="Last name"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.onChange}
                                    error={errors.lastName}

                                />
                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    type="password"
                                    placeholder="Confirm password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
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

Register.protoTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(Register));
