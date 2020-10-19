import React from 'react';
import "./product.css"
import {Link} from "react-router-dom";

const productItem = ({title, description, img, price, id, addBasket}) => {
    return (
        <div className="card">
            <img alt={" "} className="card-img-top" src={"/api/attach/preview/" + img}
                 />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><h4 className="text-muted">Price: {price + " $"}</h4></p>
                <p className="card-text text-center">
                    <button onClick={addBasket} className="btn btn-danger fs"><i
                        className="fas fa-shopping-basket"/> Add to basket
                    </button>
                    <Link className=" ml-2 btn btn-info" to={"product/" + id}><i className="fas fa-eye"/> Preview</Link>
                </p>
            </div>
        </div>
    )
}

export default productItem;