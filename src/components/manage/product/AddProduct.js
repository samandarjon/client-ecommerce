import React, {Component} from 'react';
import TextFieldGroup from "../../comman/TextFieldGroup";
import TextAreaFieldGroup from "../../comman/TextAreaInputGroup";
import axios from "axios";
import SelectListGroup from "../../comman/SelectListGroup";
import InputGroup from "../../comman/InputGroup";
import PropTypes from "prop-types"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {addProduct} from "../../../actions/productAction";

class AddProduct extends Component {
    onChangeHandler(e) {
        const data = new FormData()
        this.setState({file: e.target.files[0]})
        console.log(e.target.files[0])
    }

    constructor(props) {
        super(props);
        this.state = {
            categoryId: "",
            title: "",
            description: "",
            price: "",
            errors: "",
            categories: [],
            details: [
                {
                    name: "",
                    value: ""
                }
            ],
            file: {}

        }
        axios.get("/api/categories")
            .then(res => {
                this.setState({categories: res.data._embedded.categories})
            }).catch(error => console.log(error.response))


    }

    addInput(i, index) {
        let details = this.state.details;
        if (i > 0) {
            details.push({
                name: "",
                value: ""
            })
        }
        if (i < 0) {
            details.splice(index, 1)
        }
        this.setState({details: details})
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onHandleInputGroupChange(e, id) {
        let newDetail = {[e.target.name]: e.target.value};
        console.log(newDetail)
        let details = this.state.details;
        details[id] = {
            name: newDetail["name" + id] ? newDetail["name" + id] : details[id].name,
            value: newDetail["value" + id] ? newDetail["value" + id] : details[id].value
        }
        this.setState({details: details})
    }

    onSubmit(e) {
        e.preventDefault();
        let detail = this.state.details.map(detail => {
            return "\"" + detail.name + "\":\"" + detail.value + "\""

        })
        detail = (detail.join(",").toString())
        detail = "{" + detail + "}"
        const newProduct = {
            "title": this.state.title,
            "description": this.state.description,
            "files": [],
            "price": parseFloat(this.state.price),
            "aboutMoreProduct": JSON.parse(detail)
        }
        let file = this.state.file;
        this.props.addProduct(this.state.categoryId ? this.state.categoryId : this.state.categories[0].id, newProduct, file, this.props.history)
    }


    render() {
        const {errors, details} = this.state
        let inputs = details.map((detail, i) =>
            <InputGroup onChange={(e) => this.onHandleInputGroupChange(e, i)}
                        value={detail}
                        addInput={() => this.addInput(+1, i)}
                        removeInput={() => this.addInput(-1, i)}
                        name={["name" + i, "value" + i]}/>
        )
        return (
            <div className={"row mx-5 my-2"}>
                <div className="col-md-8 offset-2">
                    <h3 className={"my-4"}>Add Product</h3>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <SelectListGroup onChange={(e) => this.onChange(e)}
                                         value={this.state.categoryId}
                                         name={"categoryId"}
                                         error={this.state.errors.categoryId}
                                         options={this.state.categories}
                        />
                        <TextFieldGroup onChange={(e) => this.onChange(e)}
                                        placeholder={"Title"}
                                        error={errors.title} value={this.state.title}
                                        name={"title"}/>
                        <TextAreaFieldGroup onChange={(e) => this.onChange(e)}
                                            placeholder={"Description"}
                                            error={errors.description}
                                            value={this.state.description}
                                            name={"description"}/>
                        <TextFieldGroup onChange={(e) => this.onChange(e)}
                                        placeholder={"Price"}
                                        value={this.state.price}
                                        name={"price"}
                                        error={errors.price}

                        />
                        {inputs}
                        <label className="file">
                            <span className={"btn btn-primary"}> Browse</span>
                            <input onChange={e => this.onChangeHandler(e)} hidden type="file" id="file"
                                   aria-label="File browser example"/>
                            <span
                                className="mx-3">{this.state.file.name ? this.state.file.name : "Choose File ..."}</span>
                        </label>
                        <input className={"btn btn-info btn-block"} type="submit"/>
                    </form>
                </div>


            </div>
        );
    }
}

AddProduct.propTypes = {
    categories: PropTypes.object,
    errors: PropTypes.object,
    addProduct: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {addProduct})(withRouter(AddProduct));