import React from "react";

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.myinter = undefined;
        this.sliderMainRef = React.createRef();
        this.slideRef = React.createRef();
        this.slidesWrapperRef = React.createRef();
        this.state = {
            slideCount: 1,
            sliderMainWidth: 0,
            slideWidth: 100,
            slidesWrapperWidth: 0,
            translateValue: 0,
            slidesLoading: false,
            slidenum: 0
        }
    }
    prevMethod = () => {
        clearInterval(this.myinter);
        this.state.translateValue < 0 &&
            this.setState((prevState) => {
                return {
                    translateValue: prevState.translateValue + this.state.sliderMainWidth
                }
            }, () => {
                this.activeSlideNumFn()
            })
    }
    nextMethod = () => {
        this.state.translateValue > -(this.state.slidesWrapperWidth - this.state.sliderMainWidth) &&
            this.setState((prevState) => {
                return {
                    translateValue: prevState.translateValue - this.state.sliderMainWidth
                }
            }, () => {
                this.activeSlideNumFn();
                clearInterval(this.myinter);
            })
    }
    activeSlideNumFn = () => {
        const slideNumber = -this.state.translateValue / this.state.sliderMainWidth;
        this.setState({
            slidenum: slideNumber
        })
    }
    gotoSlide = (index) => {
        clearInterval(this.myinter);
        this.setState((prevState) => {
            return {
                translateValue: -(this.state.sliderMainWidth * index) + this.state.sliderMainWidth
            }
        }, () => {
            this.activeSlideNumFn()
            // console.log(this.state)
        })
    }
    componentDidMount() {
        setTimeout(() => {
            const sliderMainWidth = this.sliderMainRef.current.clientWidth;
            this.setState({
                slidesLoading: true,
                sliderMainWidth: sliderMainWidth,
                slideCount: this.slidesWrapperRef.current.childElementCount
            }, () => {
                this.setState({
                    slideWidth: this.state.sliderMainWidth,
                    slidesWrapperWidth: this.state.slideCount * this.state.sliderMainWidth
                })
                this.myinter = setInterval(() => {
                    this.nextMethod();
                }, 6000);
            });
        }, 500)
    }
    render() {
        const printSlides = this.props.shortInfoArr.map((item, index) => {
            return (<div key={index} className="slide col-lg-12 p-0 d-flex flex-row flex-wrap justify-content-between" ref={this.slideRef} style={{ 'maxWidth': this.state.slideWidth }}>
                <div className="col-lg-6 p-0 column1 left-column">
                    <div className="col-lg-12 p-0 d-flex justify-content-center">
                        <img className="img-fluid" src={item.imageURL} alt="url" />
                    </div>
                </div>
                <div className="col-lg-6 p-0 column2 right-column d-none d-lg-block">
                    <div className="col-lg-12 p-0 d-flex justify-content-start align-items-center">
                        <span>
                            <small className="font-16 font-weight-800 pl-2">Price: {item.price} Only</small>
                            <h1 className="font-30">
                                {item.name}
                            </h1>
                        </span>
                    </div>
                </div>
            </div>)
        })
        return (<>
            <section className="slider-section two-col-section">
                <div className="container p-0">
                    <div className="row">
                        <article className="sliderMain col-lg-12 p-0 inrow-1 col-wrapper" ref={this.sliderMainRef}>
                            {!this.state.slidesLoading && (<div className="loaderdiv d-flex align-items-center justify-content-center">
                                <h1>Loading...</h1>
                            </div>)}

                            <div className="slides-wrapper" ref={this.slidesWrapperRef} style={{ 'width': this.state.slidesWrapperWidth, transform: 'translateX(' + this.state.translateValue + 'px)' }}>
                                {printSlides}
                            </div>
                            <div className="nav-btns col-12 p-0">
                                <button className="arrow prev-btn p-0 pr-2" onClick={() => this.prevMethod()}><span className="font-30">&#8678;</span></button>
                                <ul>
                                    {
                                        this.props.shortInfoArr.map((item, index) => <li key={index} className="d-none d-lg-block"><button key={index} className={`nav-btn ${this.state.slidenum === index && 'active'}`} onClick={() => this.gotoSlide(index + 1)}>&nbsp;</button></li>)
                                    }
                                </ul>
                                <button className="arrow next-btn p-0 pl-2" onClick={() => this.nextMethod()}><span className="font-30">&#8680;</span></button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>)
    }
}
export default Slider;