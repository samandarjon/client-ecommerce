import React, {Component} from 'react';
import ProductItem from "../product/ProductItem";

class Landing extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-deck mt-2">
                            <div className="card-columns">

                                <ProductItem title="SSD m2 Evo920"
                                             description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                             price="100" id="1"/>
                                <ProductItem title="SSD m2 Evo920"
                                             description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                             price="100"/>
                                <ProductItem title="SSD m2 Evo920"
                                             description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                             price="100" id="1"/>
                                <ProductItem title="SSD m2 Evo920"
                                             description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                             price="100"/>
                                <ProductItem title="SSD m2 Evo920"
                                             description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                             price="100"/>
                                <ProductItem
                                    title="SSD m2 Evo920"
                                    description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                    price="100"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;