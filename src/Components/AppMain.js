import React from "react";
import Footer from "./Footer";
import ProductsAll from "./ProductsAll";
import Slider from "./Slider";
import TopNavigation from "./TopNavigation";
import { UserContextConsumer } from './UserContext'
class AppMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<>
            <UserContextConsumer>
                {
                    (ContObj) => {
                        const shortInfoArr = ContObj.allProductsDataFromApi.map((product) => {
                            return { imageURL: product.imageURL, name: product.name, price: product.price };
                        })
                        return (<>
                            <TopNavigation isSearch={true} />
                            <Slider shortInfoArr={shortInfoArr} />
                            <ProductsAll
                                isSideNavOpen={false}
                                allProductsDataFromApi={ContObj.allProductsDataFromApi}
                                filterTheData={ContObj.filterTheData}
                                addToCartFn={ContObj.addToCartFn}
                                // wholeFilterArray={ContObj.wholeFilterArray}
                                searchInputValue={ContObj.searchInputValue}
                            />
                            <Footer />
                        </>)
                    }
                }
            </UserContextConsumer>
        </>)
    }
}
export default AppMain;