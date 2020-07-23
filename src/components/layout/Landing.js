import React, {Component} from 'react';
import ProductItem from "../product/ProductItem";

class Landing extends Component {
    render() {
        return (
            <div className="mt-3">

                <ProductItem/>
            </div>
        );
    }
}

export default Landing;