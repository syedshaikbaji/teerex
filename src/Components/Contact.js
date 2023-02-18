import React, { useEffect, useRef } from 'react'
import Footer from './Footer';
import TopNavigation from "./TopNavigation";
import { UserContextConsumer } from './UserContext';

function Contact() {
  const inputsRef = useRef();
  const onSubmitLocalFn = (event, ContObj) => {
    let myb = [];
    inputsRef.current.querySelectorAll('input').forEach(input => {
      if (input.value === '') {
        input.focus();
        myb.push(false);
      } else {
        myb.push(true);
      }
    });
    myb.every(b => b === true) && ContObj.onSubmitContactFormDataFn();
  }
  useEffect(() => {

  })
  return (<>
    <UserContextConsumer>
      {
        (ContObj) => {
          return (<>
            <TopNavigation ContObj={ContObj} isSearch={false} />
            <div className="col-lg-12 p-0 contactus-content py-0 py-lg-5">
              <div className="col-lg-12 p-0 d-flex justify-content-between flex-wrap">
                <div className="inrow-left col-lg-6 p-0 px-2 px-lg-5 mb-5 mb-lg-0">
                  <div className="addresslines col-lg-8 mx-auto p-0 text-center d-flex align-items-center flex-wrap align-content-center">
                    <div className="address-row d-inline-flex align-items-center mb-5">
                      <span className='address-icon p-0 px-4 bsr-1'>
                        <img className="img-fluid" src={require(`../assets/images/icons/ic-home.svg`).default} alt="logo" />
                      </span>
                      <span className='address-text p-0 px-4 text-left'>
                        <h3 className='mb-3 text-uppercase font-weight-800 font-20 color-green'>Address</h3>
                        <p className=''>868 1ST AVENUE, <br /> Bangalore, India.</p>
                      </span>
                    </div>
                    <div className="address-row d-inline-flex align-items-center mb-5">
                      <span className='address-icon p-0 px-4 bsr-1'>
                        <img className="img-fluid" src={require(`../assets/images/icons/ic-mail.svg`).default} alt="logo" />
                      </span>
                      <span className='address-text p-0 px-4 text-left'>
                        <h3 className='mb-3 text-uppercase font-weight-800 font-20 color-green'>Email</h3>
                        <p className=''>INFO@EXAMPLE.COM</p>
                      </span>
                    </div>
                    <div className="address-row d-inline-flex align-items-center mb-0">
                      <span className='address-icon p-0 px-4 bsr-1'>
                        <img className="img-fluid" src={require(`../assets/images/icons/ic-phone.svg`).default} alt="logo" />
                      </span>
                      <span className='address-text p-0 px-4 text-left'>
                        <h3 className='mb-3 text-uppercase font-weight-800 font-20 color-green'>CALL TO US</h3>
                        <p className=''>(+123) 912 345 6789</p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="inrow-right col-lg-6 p-0 px-2 px-lg-5" ref={inputsRef}>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input name="Name" onChange={(event) => ContObj.contactInputChangeHandlerFn(event)} type="text" className="form-control" placeholder="Name" value={ContObj.name} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input name="Subject" onChange={(event) => ContObj.contactInputChangeHandlerFn(event)} type="text" className="form-control" placeholder="Subject" value={ContObj.subject} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input name="Email" onChange={(event) => ContObj.contactInputChangeHandlerFn(event)} type="text" className="form-control" placeholder="Email" value={ContObj.email} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input name="Phone" onChange={(event) => ContObj.contactInputChangeHandlerFn(event)} type="text" className="form-control" placeholder="Phone" value={ContObj.phone} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea name="comments" onChange={(event) => ContObj.contactInputChangeHandlerFn(event)} className='form-control' placeholder='Write your comments below' cols="30" rows="10" value={ContObj.comments} required></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group d-flex flex-wrap justify-content-between">
                      <button type="button" className="obtn obtn-reset px-3 px-lg-5 py-2 font-22"
                        onClick={() => ContObj.contactInputResetHandlerFn()}
                      >
                        RESET
                      </button>
                      <button
                        type="button"
                        className="obtn obtn-primary px-3 px-lg-5 py-2 font-22"
                        onClick={(event) => onSubmitLocalFn(event, ContObj)}
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>)
        }
      }
    </UserContextConsumer>
  </>)
}

export default Contact