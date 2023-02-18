import React from "react";
import Footer from "./Footer";
import ProductsAll from "./ProductsAll";
import TopNavigation from "./TopNavigation";

const Productspage = (props) => {
    return (<>
        <TopNavigation isSearch={true} />
        <ProductsAll
            isSideNavOpen={true}
            allProductsDataFromApi={props.allProductsDataFromApi}
            filterTheData={props.filterTheData}
            addToCartFn={props.addToCartFn}
            wholeFilterArray={props.wholeFilterArray}
            searchInputValue={props.searchInputValue}
            showSideNavHandlerFnOnMobile={props.showSideNavHandlerFnOnMobile}
        />
        <Footer />
    </>)
}

export default Productspage;