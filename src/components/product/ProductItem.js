import React from 'react';
import "./product.css"

const productItem = ({title, description, img, price, id, addBasket, bayProduct}) => {
    return (
        <div>
            <div className="wrapper">

                <div className="product">
                    <div className="title">
                        AF VR ZOOM-NIKKOR 80-400MM F/4.5-5.6D ED
                    </div>

                    <div className="text">
                        <div className="code">Product 1996</div>
                        <div className="description">
                            The ultimate medium to super-telephoto zoom lens.
                        </div>
                        <div className="review">
                            <span className="star-icon"></span>
                            <span className="star-icon"></span>
                            <span className="star-icon"></span>
                            <span className="star-icon"></span>
                            <span className="star-icon star-disable"></span>
                            <span className="star-reviews">84 reviews</span>
                        </div>
                        <div className="price">
                            $1,849.95
                        </div>
                        <div className="shop-actions">
                            <button><img
                                src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/shopping-cart-20.png"/> Add to
                                Cart
                            </button>
                        </div>
                    </div>

                    <div className="preview">
                        <svg className="svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <circle className="circle" cx="100" cy="100" r="100"/>
                            <image className="image"
                                   href="http://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-fTYlSZPBjlMhlFa1VHARsAMnUXr0r65W8XOJsHIQxeq_m3jcWAnFaskzdz7WzoICu9qJNoS76YW3Qa7aSB9_ky28ht1Iw6dE=/Views/1996_AF-VR-Zoom-NIKKOR-80-400mm-f4.5-5.6D_Product.png"
                                   x="0" y="0" width="200px" height="180px"/>
                        </svg>
                    </div>

                </div>


                <div className="product">
                    <div className="title">
                        NIKON D500
                    </div>

                    <div className="text">
                        <div className="code">Product 5485</div>
                        <div className="description">
                            Flagship Power, DX Agility.
                        </div>
                        <div className="review">
                            <span className="star-icon"></span>
                            <span className="star-icon"></span>
                            <span className="star-icon"></span>
                            <span className="star-icon"></span>
                            <span className="star-icon"></span>
                            <span className="star-reviews">25 reviews</span>
                        </div>
                        <div className="price">
                            $1,799.95
                        </div>
                        <div className="shop-actions">
                            <button><img
                                src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/shopping-cart-20.png"/> Add to
                                Cart
                            </button>
                        </div>
                    </div>

                    <div className="preview">
                        <svg className="svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <circle className="circle" cx="100" cy="100" r="100"/>
                            <image className="image"
                                   href="http://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9beHK4x3L-8go_p7JUL6JpQM9h_9xTbwyw==/Views/1559_D500_front.png"
                                   x="0" y="0" width="200px" height="180px"/>
                        </svg>
                    </div>


                </div>


            </div>
        </div>
    )
}

export default productItem;