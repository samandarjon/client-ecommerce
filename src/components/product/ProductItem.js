import React from 'react';
import "./product.css"
import images from "./ssd.jpg"
const productItem = ({title, description, img, price, id, addBasket, bayProduct}) => {
    return (
        <div key=id className="card">
            <img className="card-img-top" src={images} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">{price + " $"}</small></p>
                <p className="card-text">
                    <button className="btn btn-danger fs"><i className="fas fa-shopping-basket"/> Add to basket</button>
                    <button className=" ml-2 btn btn-info"><i className="fas fa-eye"/> Preview</button>
                </p>
            </div>
        </div>
    )
}

export default productItem;