import React from 'react'

const Product = React.forwardRef((props, ref) => {
    const { product, isSideNavOpen, addToCartFn } = props;
    return (<>
        <div className="col-lg-3 p-3">
            <div className={`product-block col-lg-12 ${isSideNavOpen ? 'p-2' : 'p-3'}`} ref={ref}>
                <div className="product-pic col-lg-12 p-0 d-flex align-items-start flex-wrap justify-content-center">
                    <h4 className='product-name px-3 py-3 col-12'>{product.gender} | {product.name}</h4>
                    <figure><img className='img-fluid' src={product.imageURL} alt={product.name} /></figure>
                    <span className={`added-quantity ${product.userQuantity > 0 && 'active'}`}> <b>{product.userQuantity}</b> Items added to cart</span>
                    <span className={`only-available ${product.onlyAvailableBool && 'active'}`}> Available quantity <b>{product.quantity}</b> Only </span>
                    <div className="pro-tag rounded-circle"
                        style={{ 'background': product.color }}
                    >&nbsp;</div>
                </div>
                <div className="product-info col-lg-12 p-0 pt-3 d-flex flex-wrap align-items-center justify-content-between">
                    <div className="col-5 p-0 text-left">
                        <p className='font-16 m-0 p-0 font-weight-700'>
                            &#8377; {product.price}
                        </p>
                    </div>
                    <div className="col-7 p-0 text-center">
                        <button onClick={() => product.quantity !== 0 && addToCartFn(product)} type="button" className={`gen-btn ${product.quantity === 0 ? 'warning' : 'primary'}`}>
                            {
                                product.quantity === 0 ?
                                    'Out of Stock' :
                                    'Add to Cart'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
});

export default Product;