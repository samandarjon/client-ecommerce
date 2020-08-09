import React, {Component} from 'react';
import TextFieldGroup from "../../comman/TextFieldGroup";
import TextAreaFieldGroup from "../../comman/TextAreaInputGroup";
import axios from "axios";
import PropTypes from "prop-types"
import SelectListGroup from "../../comman/SelectListGroup";

class AddProduct extends Component {
    onChangeHandler(e) {
        const data = new FormData()
        data.append('file', e.target.files[0])
        axios.post("/api/attach/upload", data)
            .then(res =>
                alert(res.data))

    }

    constructor(props) {
        super(props);
        this.state = {
            categoryId: "",
            title: "",
            description: "",
            errors: "",
            categories: []
        }
        axios.get("/api/categories")
            .then(res => {
                this.setState({categories: res.data._embedded.categories})
            }).catch(error => console.log(error.response))


    }

    onChange(e) {
        this.setState({[e.target.name]: (e.target.value)})
    }

    onSubmit(e) {
        e.preventDefault();
        //    TODO
    }

    render() {
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
                        <TextFieldGroup onChange={(e) => this.onChange(e)} placeholder={"Title"}
                                        error={this.state.errors.title} value={this.state.title}
                                        name={"title"}/>
                        <TextAreaFieldGroup onChange={(e) => this.onChange(e)} placeholder={"Description"}
                                            error={this.state.errors.description}
                                            value={this.state.description}
                                            name={"description"}/>
                        <input type="file" name="file" onChange={event => this.onChangeHandler(event)}/>
                        <input type="submit"/>
                    </form>
                </div>


            </div>
        );
    }
}

AddProduct.propTypes = {
    categories: PropTypes.object

}

export default AddProduct;