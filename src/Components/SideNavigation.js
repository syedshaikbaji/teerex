import React, { useEffect, useRef } from 'react'
// import { UserContextConsumer } from './UserContext';
function SideNavigation(props) {
  const { ContObj, wholeFilterArray } = props;
  const forRenderFilterItems = [];
  for (let fcat in wholeFilterArray) {
    forRenderFilterItems.push({ 'title': fcat, 'filterList': [...wholeFilterArray[fcat]] });
  }
  const autoHeightCategories = (event) => {
    if (event !== null) {
      let panel = event.target.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
      event.target.classList.toggle('active')
      event.target.nextElementSibling.classList.toggle('active');
    } else {
      const panelClassDiv = document.querySelectorAll('.panel');
      panelClassDiv.forEach((item) => {
        item.style.maxHeight = item.scrollHeight + "px";
      })
    }
  }
  const accordHeadClickFn = (event) => {
    autoHeightCategories(event);
  }
  useEffect(() => {
    autoHeightCategories(null);
  })
  return (<>
    <div className="col-lg-12 p-0 px-2">
      <h2 className='px-2 py-2 font-18 color-black font-weight-700 d-flex flex-wrap align-items-center justify-content-between'>
        <span>
          <i className="con sm white mr-2"><img src={require(`../assets/images/icons/ic-filter-outline.svg`).default} alt="filter" /></i>
          Fliter Products
        </span>
      </h2>
      <div className="filter-container col-12 p-0 mt-3 mt-lg-0">
        {
          forRenderFilterItems.map((filteritem, index) => {
            return (<div key={index} className="accordian-group col-12 p-0 mb-2">
              <button className="accordion px-2 py-1 active font-16" onClick={(event) => accordHeadClickFn(event)}>{filteritem.title}</button>
              <div className="panel active">
                <ul className='ful m-0 p-0'>
                  {
                    filteritem.filterList.map((item, index) => {
                      return (<li key={index} className='p-0'>
                        <div className="form-group form-check m-0">
                          <label className="form-check-label m-0 py-2 px-3 font-14 font-weight-500">
                            <input
                              type="checkbox"
                              onChange={(event) => ContObj.finputChangeHandlerFn(event, filteritem.title.toLowerCase())}
                              value={item.fval}
                              checked={item.selected ? true : false}
                              className="form-check-input mr-2"
                            />
                            {item.fval}
                          </label>
                        </div>
                      </li>)
                    })
                  }
                </ul>
              </div>
            </div>)
          })
        }
      </div>
    </div>
  </>)
}
export default SideNavigation