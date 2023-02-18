import React, { useState, useEffect, useRef } from 'react'
import Product from './Product';
import SideNavigation from './SideNavigation';
import { UserContextConsumer } from './UserContext';
const ProductsAll = (props) => {
  const [resultProductsArray, setResultProductsArray] = useState([]);
  const proRef = useRef([]);
  const { isSideNavOpen, allProductsDataFromApi, filterTheData, addToCartFn, wholeFilterArray, searchInputValue, showSideNavHandlerFnOnMobile } = props;
  let resultArray = [];
  const feedResultProductsArrayFn = (procat, onlySelectedToFilter) => {
    const farr = resultArray.length > 0 ? resultArray : allProductsDataFromApi;
    resultArray = farr.filter((product) => {
      return onlySelectedToFilter.some(item => {
        if (procat === 'price') {
          const maxNum = item['fval'].split(' ').pop();
          const minNum = item['fval'].split(' ').shift();
          return parseInt(product[procat]) > parseInt(minNum) && parseInt(product[procat]) <= parseInt(maxNum);
        }
        return product[procat] === item.fval;
      })
    });
    setResultProductsArray(resultArray);
  }
  const isEverythingisfalse = (wholeFilterArray) => {
    const checkarr = [];
    for (let fcat in wholeFilterArray) {
      checkarr.push(...wholeFilterArray[fcat])
    }
    return checkarr.every(item => item.selected === false);
  };
  const fillSelectedItemtoArrayFn = (wholeFilterArray, category) => {
    return wholeFilterArray[category].filter(fitem => {
      return fitem.selected === true;
    });
  }
  useEffect(() => {
    console.log('Product all component did mount =========================')
    if (isEverythingisfalse(wholeFilterArray)) {
      feedResultProductsArrayFn(null, allProductsDataFromApi);
    } else {
      for (let procat in wholeFilterArray) {
        switch (procat) {
          case 'gender':
            const onlySelectedGendersToFilter = fillSelectedItemtoArrayFn(wholeFilterArray, 'gender');
            onlySelectedGendersToFilter.length > 0 && feedResultProductsArrayFn(procat, onlySelectedGendersToFilter);
            break;
          case 'type':
            const onlySelectedTypesToFilter = fillSelectedItemtoArrayFn(wholeFilterArray, 'type');
            onlySelectedTypesToFilter.length > 0 && feedResultProductsArrayFn(procat, onlySelectedTypesToFilter);
            break;
          case 'color':
            const onlySelectedColorToFilter = fillSelectedItemtoArrayFn(wholeFilterArray, 'color');
            onlySelectedColorToFilter.length > 0 && feedResultProductsArrayFn(procat, onlySelectedColorToFilter);
            break;
          case 'price':
            const onlySelectedPriceToFilter = fillSelectedItemtoArrayFn(wholeFilterArray, 'price');
            onlySelectedPriceToFilter.length > 0 && feedResultProductsArrayFn(procat, onlySelectedPriceToFilter);
            break;
          default:
            console.log(`This is for ALL Products`);
        }
      }
    }
  }, [isSideNavOpen, allProductsDataFromApi, filterTheData, addToCartFn, wholeFilterArray, searchInputValue]);
  const renderFilteredData = resultProductsArray.map((item, index) => {
    if (searchInputValue === '') {
      return <Product
        key={item.id}
        product={item}
        isSideNavOpen={isSideNavOpen}
        addToCartFn={addToCartFn}
        ref={(element) => proRef.current[index] = element}
      />;
    } else {
      if (Object.values(item).join('@').toLowerCase().includes(searchInputValue)) {
        return <Product
          key={item.id}
          product={item}
          isSideNavOpen={isSideNavOpen}
          addToCartFn={addToCartFn}
          ref={(element) => proRef.current[index] = element}
        />;
      }
    }
  });
  return (<>
    <section className={`filter-bread-crumbs ${isSideNavOpen ? '' : 'd-none'}`}>
      <div className="container p-0">
        <div className="col-12 px-2 pt-2 mb-0">
          <span className='ic-filter d-inline-flex d-lg-none' onClick={() => showSideNavHandlerFnOnMobile()}>
            <i className="con sm m-0">&nbsp;</i>
          </span>
          <ul className='choices-list d-none d-lg-block'>
            <li className='d-inline font-16 px-0 py-1 mr-2 mb-lg-0 mb-2 font-weight-700'>Filters Applied : </li>
            <UserContextConsumer>
              {
                (ContObj) => {
                  return (ContObj.choiceslist.some(item => (item.selected === true)) ? ContObj.choiceslist.map((item, index) => {
                    return item.selected && (<li key={index} className='choices-item font-14 px-2 py-1 mr-2 mb-lg-0 mb-2'> {item.fval} </li>);
                  }) : <li className='choices-item font-14 px-2 py-1 mr-2 mb-lg-0 mb-2'> All </li>);
                }
              }
            </UserContextConsumer>
          </ul>
        </div>
      </div>
    </section>
    <section className={`xxx-section fou-col-section ${isSideNavOpen ? 'with-sidenav' : ''}`}>
      <div className="container p-0">
        <div className="row">
          <article className="col-lg-12 p-0 inrow-1 col-wrapper d-flex flex-row flex-wrap justify-content-start">
            {
              isSideNavOpen && <div className="side-navigation col-lg-2 p-0 pt-3 pb-2 sidenav-hidden">
                <UserContextConsumer>
                  {
                    (ContObj) => (<SideNavigation ContObj={ContObj} wholeFilterArray={wholeFilterArray} />)
                  }
                </UserContextConsumer>
              </div>
            }
            <div className={`${isSideNavOpen ? 'col-lg-10' : 'col-lg-12'} p-0 ${isSideNavOpen ? 'pb-2' : 'py-3'} d-flex flex-wrap align-content-start products-parent-div`}>
              {
                renderFilteredData.length > 0 ?
                  renderFilteredData :
                  (
                    <div className="col-lg-12 p-0 d-flex align-items-center justify-content-center"><h1 className='text-center'>No Such Products</h1></div>
                  )
              }
            </div>
          </article>
        </div>
      </div>
    </section>
  </>)
}
export default ProductsAll;