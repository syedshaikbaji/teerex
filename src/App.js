import { Routes, Route } from 'react-router-dom';
import './App.css';
import data from './Components/api/data';
import AppMain from './Components/AppMain';
import Contact from './Components/Contact';
import Cart from './Components/Cart';
import Payment from './Components/Payment';
import OrderConfirm from './Components/OrderConfirm';
import { UserContextProvider } from './Components/UserContext';
import React, { Component } from 'react'
import initialFilterArrayFromApi from './Components/api/initialFilterArrayFromApi';
import Productspage from './Components/Productspage';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      allProductsDataFromApi: [],
      cartData: [],
      filterTheData: {},
      wholeFilterArray: [],
      searchInputValue: '',
      choiceslist: [],
      name: '', subject: '', email: '', phone: '', comments: '',
      showSideNavOnMobile: false
    }
  }
  addToCartFn = (item) => {
    if (item.userQuantity >= item.quantity) {
      item.userQuantity = item.quantity;
      item.onlyAvailableBool = true;
    } else {
      item.userQuantity = parseInt(item.userQuantity) + 1
    }
    let cartItemIndex = this.findIndexOfFn(this.state.cartData, item.id);
    if (cartItemIndex < 0) {
      this.setState({
        cartData: [...this.state.cartData, item]
      }, () => {
        this.quantityChangeHandlerFn(null, item);
      })
    } else {
      this.quantityChangeHandlerFn(null, item);
    }
  }
  quantityChangeHandlerFn = (event, cartProduct) => {
    if (event) {
      if (event.target.value <= 0 && event.target.value !== '') {
        cartProduct.userQuantity = 1
      } else if (event.target.value > cartProduct.quantity) {
        cartProduct.userQuantity = cartProduct.quantity;
      } else {
        cartProduct.userQuantity = event.target.value
      }
    }
    cartProduct.cartItemTotal = cartProduct.userQuantity * cartProduct.price;
    let proIndex = this.findIndexOfFn(this.state.cartData, cartProduct.id);
    let newCartData = [...this.state.cartData];
    newCartData[proIndex] = cartProduct;
    this.setState({
      cartData: [...newCartData]
    }, () => {
      // console.log(this.state.cartData)
    })
  }
  findIndexOfFn = (arrayOfObj, uid) => {
    let oindex = arrayOfObj.findIndex((obj) => obj.id === uid);
    return oindex;
  }
  removeCartItemFn = (cartProduct, proIndex) => {
    let newCartDataArr = [...this.state.cartData];
    newCartDataArr.splice(proIndex, 1);
    let proIndexInAllData = this.findIndexOfFn(this.state.allProductsDataFromApi, cartProduct.id);
    let newAllData = [...this.state.allProductsDataFromApi];
    newAllData[proIndexInAllData].userQuantity = 0;
    newAllData[proIndexInAllData].onlyAvailableBool = false;
    this.setState({
      allProductsDataFromApi: [...newAllData],
      cartData: [...newCartDataArr]
    })
  }
  setInitialFilterArrayFromApiWithSelectedItems = (event, filtercat) => {
    this.setState((prevState) => {
      return {
        ...prevState.wholeFilterArray,
        filtercat: prevState.wholeFilterArray[filtercat].map((obj) => {
          return (obj['fval'] === event.target.value ? Object.assign(obj, { selected: event.target.checked ? true : false }) : obj);
        })
      }
    }, () => {
      let allvals = [];
      for (let cat in this.state.wholeFilterArray) {
        allvals.push(...this.state.wholeFilterArray[cat]);
      }
      this.setState({
        choiceslist: [...allvals]
      }, () => {
        // console.log(this.state.choiceslist);
      });
    });
  }
  finputChangeHandlerFn = (event, filtercat) => {
    this.setInitialFilterArrayFromApiWithSelectedItems(event, filtercat);
    this.setState({
      filterTheData: event.target.checked ? { fcat: filtercat, fval: event.target.value } : {}
    }, () => {
    });
  }
  onChangeSearchInputHandler = (event) => {
    event === null ?
      this.setState({ searchInputValue: '' }) :
      this.setState({ searchInputValue: event.target.value.toLowerCase() });
  }
  contactInputChangeHandlerFn = (event) => {
    this.setState({ [event.target.name.toLowerCase()]: event.target.value });
  }
  contactInputResetHandlerFn = (event) => {
    this.setState({
      name: '', subject: '', email: '', phone: '', comments: ''
    });
  }
  onSubmitContactFormDataFn = (event) => {
    alert(`Name: ${this.state.name} \n Subject: ${this.state.subject} \n Email: ${this.state.email} \n Phone: ${this.state.phone} \n Comments: ${this.state.comments}`);
  }
  showSideNavHandlerFnOnMobile = () => {
    let sideNav = document.querySelectorAll('.side-navigation');
    let icFilter = document.querySelectorAll('.ic-filter');
    sideNav[0].classList.toggle('sidenav-hidden');
    icFilter[0].classList.toggle('sidenav-showing');
  }
  componentDidMount() {
    // fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     data.map((item) => {
    //       item.userQuantity = 0;
    //       item.cartItemTotal = item.userQuantity * item.price;
    //       item.onlyAvailableBool = false;
    //       return item;
    //     });
    //     this.setState({ allProductsDataFromApi: data }, () => {
    //       this.setState({ wholeFilterArray: initialFilterArrayFromApi(this.state.allProductsDataFromApi) });
    //     });
    //   });
    data.map((item) => {
      item.userQuantity = 0;
      item.cartItemTotal = item.userQuantity * item.price;
      item.onlyAvailableBool = false;
      return item;
    });
    this.setState({ allProductsDataFromApi: data }, () => {
      this.setState({ wholeFilterArray: initialFilterArrayFromApi(this.state.allProductsDataFromApi) });
    });
    console.log('APP component Did Mount =================')
  }
  render() {
    return (
      <UserContextProvider value={{
        ...this.state,
        addToCartFn: this.addToCartFn,
        quantityChangeHandlerFn: this.quantityChangeHandlerFn,
        findIndexOfFn: this.findIndexOfFn,
        removeCartItemFn: this.removeCartItemFn,
        finputChangeHandlerFn: this.finputChangeHandlerFn,
        onChangeSearchInputHandler: this.onChangeSearchInputHandler,
        contactInputChangeHandlerFn: this.contactInputChangeHandlerFn,
        onSubmitContactFormDataFn: this.onSubmitContactFormDataFn,
        contactInputResetHandlerFn: this.contactInputResetHandlerFn,
        showSideNavHandlerFnOnMobile: this.showSideNavHandlerFnOnMobile
      }}>
        <Routes>
          <Route path="/" element={<AppMain />}></Route>
          <Route path="/teerex" element={<AppMain />}></Route>
          <Route path="/products" element={
            <Productspage
              isSideNavOpen={true}
              allProductsDataFromApi={this.state.allProductsDataFromApi}
              filterTheData={this.state.filterTheData}
              addToCartFn={this.addToCartFn}
              wholeFilterArray={this.state.wholeFilterArray}
              searchInputValue={this.state.searchInputValue}
              showSideNavHandlerFnOnMobile={this.showSideNavHandlerFnOnMobile}
            />
          }>
          </Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/order-confirm" element={<OrderConfirm />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </UserContextProvider>
    );
  }
}

export default App
