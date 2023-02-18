import React from 'react'
import TopNavigation from './TopNavigation';
import { UserContextConsumer } from './UserContext';
import { Link } from 'react-router-dom';

function Cart(props) {
  const increDecreMentFn = (option, cartProduct, ContObj) => {
    if (option === 'plus') {
      cartProduct.userQuantity = cartProduct.userQuantity >= cartProduct.quantity ? cartProduct.quantity : parseInt(cartProduct.userQuantity) + 1;
    } else {
      cartProduct.userQuantity = parseInt(cartProduct.userQuantity) <= 1 ? 1 : parseInt(cartProduct.userQuantity) - 1;
    }
    ContObj.quantityChangeHandlerFn(null, cartProduct)
  }
  return (<>

    <UserContextConsumer>
      {(ContObj) => {
        let totalCartItemsPrice = 0;
        return (<>
          <TopNavigation ContObj={ContObj} isSearch={false} />
          <section className="xxx-section one-col-section mt-5">
            <div className="container">
              <div className="row">
                <article className="col-lg-10 mx-auto p-0 col-wrapper inrow-group">
                  <h1 className='mb-5 font-30 font-weight-600 color-green'>Your Shopping Cart is {ContObj.cartData.length === 0 ? (<>Empty <Link to="/products"><button className='gen-btn info color-black'>Continue Shopping..</button></Link></>) : 'Here'}</h1>
                </article>
                <article className="col-lg-10 mx-auto p-0 col-wrapper inrow-group">
                  <div className="col-lg-8 p-0 column1">
                    {
                      ContObj.cartData.map((cartProduct, proIndex) => {
                        totalCartItemsPrice = totalCartItemsPrice + (cartProduct.userQuantity * cartProduct.price)
                        return (<div key={cartProduct.id} className="cart-item inrow-1 py-4 px-2 mb-3 align-items-center justify-content-between">
                          <div className="col-lg-2 p-0 text-center">
                            <img className='img-fluid' src={cartProduct.imageURL} alt={cartProduct.name} />
                          </div>
                          <div className="col-lg-10">
                            <div className="inrow-group">
                              <div className="inrow-1 col-lg-12 p-0 mb-3">
                                <h4 className='product-name p-0 col-12 font-24 pb-2 font-weight-700 d-flex justify-content-between color-black'>{cartProduct.name}
                                  <p className='font-18 m-0 p-0 font-weight-700'>
                                    &#8377; {cartProduct.price}
                                  </p></h4>
                                <small><span className='color-light-blue'>Av. Quantity:</span> {cartProduct.quantity}</small>
                              </div>
                              <div className="inrow-2 col-lg-12 p-0 align-items-end justify-content-between">
                                <span className='d-flex align-items-center'>
                                  <div className="incrementDecrement form-group m-0 mr-3">
                                    <span onClick={() => increDecreMentFn('minus', cartProduct, ContObj)} className={`ment incre ${cartProduct.userQuantity < 2 ? 'disabled' : ''}`}>-</span>
                                    <input type="number"
                                      className="form-control"
                                      value={cartProduct.userQuantity}
                                      onChange={(event) => ContObj.quantityChangeHandlerFn(event, cartProduct)} />
                                    <span onClick={() => increDecreMentFn('plus', cartProduct, ContObj)} className={`ment decre ${cartProduct.userQuantity === cartProduct.quantity ? 'disabled' : ''}`}>+</span>
                                  </div>
                                  <p className='font-18 m-0 p-0 font-weight-700 color-black'><span className='font-14 m-0 p-0 font-weight-700 color-light-blue'>Sub total:</span> &#8377;{cartProduct.cartItemTotal}</p>
                                </span>
                                <span>
                                  <button onClick={() => ContObj.removeCartItemFn(cartProduct, proIndex)} className='gen-btn warning'>Remove Item</button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>)
                      })
                    }
                  </div>
                  <div className="col-lg-4 p-3 column2 text-right">
                    <h1 className='mb-5 font-30 font-weight-600 color-green'><small>Order Total:</small> &#8377;{totalCartItemsPrice}</h1>
                    {ContObj.cartData.length !== 0 && (<button className='gen-btn info color-black'>Proceed to Buy</button>)} 
                  </div>
                </article>
              </div>
            </div>
          </section>
        </>)
      }}
    </UserContextConsumer>
  </>)
}

export default Cart