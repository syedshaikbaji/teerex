import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom';
import { UserContextConsumer } from './UserContext';

function TopNavigation(props) {
  const navigate = useNavigate();
  const goToCart = () => {
    navigate('/cart')
  }
  return (<>
    <UserContextConsumer>
      {
        (ContObj) => (<section className="navigation-section nav-dark nav-fixed">
          <div className="container py-1">
            <div className="row">
              <nav className="main-navigation col-12 p-0">
                <div className="logo-block col-6 col-lg-2 p-0 line-height-0">
                  <Link className='brand line-height-0' to="/">
                    <img src={require(`../assets/images/teerex-logo.png`)} alt="logo" />
                    TEE REX
                  </Link>
                  <button>&#9776;</button>
                </div>
                <div className="page-nav-block col-lg-5 p-0 py-3 py-lg-0">
                  <div className="navlinks col-lg-12 p-0">
                    <ul>
                      <li><NavLink to="/">Home</NavLink></li>
                      <li><NavLink to="/products">Products</NavLink></li>
                      <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                  </div>
                </div>
                <div className="search-block col-lg-3 ml-auto p-0">
                  <div className={`form-group m-0 ${props.isSearch !== true && 'd-none'}`}>
                    <span className="has-icon">
                      <input
                        type="text"
                        id="SearchInput"
                        className="form-control px-0 px-lg-2"
                        placeholder="Search by Product Name"
                        onChange={(event) => ContObj.onChangeSearchInputHandler(event)}
                        value={ContObj.searchInputValue}
                      />
                      <i className="con">
                        {
                          ContObj.searchInputValue === '' ?
                            <img src={require(`../assets/images/icons/ic-search.svg`).default} alt="search icon" /> :
                            <img 
                            src={require(`../assets/images/icons/ic-times.svg`).default}
                            onClick={(event) => ContObj.onChangeSearchInputHandler(null)}
                            className='ic-sm pevents-all' 
                            alt="search icon" />
                        }
                      </i>
                    </span>
                  </div>
                </div>
                <div className="profile-main-block col-6 col-lg-2 p-0 d-flex align-items-center justify-content-end">
                  <i className='con px-3 mr-5' onClick={() => goToCart()}>
                    <img src={require(`../assets/images/icons/ic-cart.png`)} alt="ic-cart" />
                    {
                      ContObj.cartData.length > 0 && (<span className='cart-count'>{ContObj.cartData.length}</span>)
                    }
                  </i>
                  <span className='profile-pic p-1'>
                    <img className='img-fluid' src={require(`../assets/images/icons/ic-user.png`)} alt="ic-user" />
                  </span>
                </div>
              </nav>
            </div>
          </div>
        </section>)
      }
    </UserContextConsumer>
  </>)
}

export default TopNavigation