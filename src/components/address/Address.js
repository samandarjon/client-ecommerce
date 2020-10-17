import React, {Component} from 'react';
import TextFieldGroup from "../comman/TextFieldGroup";
import withRouter from "react-router-dom/es/withRouter";
import {connect} from "react-redux";
import {addAddress, deleteAddress, getAddress, updateAddress} from "../../actions/addressAction";
import propTypes from "prop-types"
import isEmpty from "../../validation/is-empty";

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            province: "",
            city: "",
            home: "",
            zipCode: "",
            addresses: [],
            update: false
        }
    }

    componentDidMount() {
        this.props.getAddress();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let address = {...this.state}
        if (!this.state.update)
            this.props.addAddress(address, this.props.history)
        else
            this.props.updateAddress(address);
        this.setState({
            id: "",
            province: "",
            city: "",
            home: "",
            zipCode: "",
            update: false
        })
    }

    onDelete(id) {
        this.props.deleteAddress(id);
    }

    onUpdate(address) {
        this.setState({
            id: address.id,
            province: address.province,
            city: address.city,
            home: address.home,
            zipCode: address.zipCode,
            update: true
        })

    }

    render() {
        let addressTable = null;
        let {addresses} = this.props.addresses;
        if (addresses.length > 0) {
            addressTable = addresses.map((address, i) => (<tr>
                <th scope="row">{i + 1}</th>
                <td>{address.province}</td>
                <td>{address.city}</td>
                <td>{address.home}</td>
                <td>{address.zipCode}</td>
                <td>
                    <button onClick={event => this.onDelete(address.id)} className={"btn btn-danger"}>Delete</button>
                </td>
                <td>
                    <button onClick={event => this.onUpdate(address)} className={"btn btn-info"}>Update</button>
                </td>
            </tr>))
        }
        console.log(isEmpty(this.state.address))
        return (
            <div>
                <h1 className="my-4 text-center">
                    {!this.state.update ?
                        "Add" : "Update"} Address</h1>
                <div className="row my-3">
                    <div className="col-md">
                        <form onSubmit={event => this.onSubmit(event)}>
                            <TextFieldGroup onChange={(e) => this.onChange(e)} placeholder={"Province"}
                                            value={this.state.province}
                                            name={"province"}/>
                            <TextFieldGroup onChange={(e) => this.onChange(e)} placeholder={"City"}
                                            value={this.state.city}
                                            name={"city"}/>
                            <TextFieldGroup onChange={(e) => this.onChange(e)} placeholder={"Home"}
                                            value={this.state.home}
                                            name={"home"}/>
                            <TextFieldGroup onChange={(e) => this.onChange(e)} placeholder={"Zip code"}
                                            value={this.state.zipCode}
                                            name={"zipCode"}/>
                            <button className={"btn btn-info btn-block"}>{(!this.state.update) ?
                                "Add" : "Update"} Address
                            </button>
                        </form>
                    </div>
                    <div className="col-md">
                        <table className="table">
                            <thead>
                            <tr className={"text-center"}>
                                <th scope="col">#</th>
                                <th scope="col">Province</th>
                                <th scope="col">City</th>
                                <th scope="col">Home</th>
                                <th scope="col">Zip code</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {addressTable}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

Address.propTypes = {
    addAddress: propTypes.func.isRequired,
    getAddress: propTypes.func.isRequired,
    deleteAddress: propTypes.func.isRequired,
    updateAddress: propTypes.func.isRequired,
    addresses: propTypes.object.isRequired
}
const mapStateToProps = state => ({
    addresses: state.addresses
})


export default connect(mapStateToProps, {
    addAddress, getAddress, deleteAddress,
    updateAddress
})(withRouter(Address));