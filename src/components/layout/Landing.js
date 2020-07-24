import React, {Component} from 'react';
import ProductItem from "../product/ProductItem";

class Landing extends Component {
    render() {
        return (
            <div className="card-deck mt-2">
                <div className="card-columns">

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

                    <ProductItem title="SSD m2 Evo920"
                                 description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                 price="100"/><
                    ProductItem title="SSD m2 Evo920"
                                description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                price="100"/>
                    <ProductItem title="SSD m2 Evo920"
                                 description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                 price="100"/>
                    <ProductItem title="SSD m2 Evo920"
                                 description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                 price="100"/> <ProductItem title="SSD m2 Evo920"
                                 description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nemo?"
                                 price="100"/>
                </div>

            </div>
        );
    }
}

export default Landing;