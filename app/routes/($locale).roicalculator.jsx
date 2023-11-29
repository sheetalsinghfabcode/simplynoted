import {useEffect, useState} from 'react';
import RoiLeadingArrowImage from '../../assets/Image/roi-leading-arrow.webp';
import RoiRobotImage from '../../assets/Image/roi-robot.webp';
import DynamicButton from '~/components/DynamicButton';
export default function RoiCalculator() {
  const [inputValues, setInputValues] = useState({
    cardsSent: 10000,
    responseRate: 8.5,
    demoLead: 75,
    demoShow: 75,
    demoClose: 50,
    averageCustomer: 5000,
  });

  const [outputValues, setOutputValues] = useState({
    costsPerContact: 2.15,
    simplyNotedBudget: 21500,
    costsPerLead: 25.29,
    costsPerDemo: 33.73,
    totalClosedDeals: 239.06,
    CPAcom: 500.0,
    CPAtotal: 589.93,
    ROItotal: 1195312.5,
    ROIpercentage: 5459.59,
  });

  function prettyFormatNumber(inputString) {
    inputString = inputString.toString();
    return inputString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    // Costs per contact
    let costsPerContact = 0;
    if (Number(inputValues.cardsSent) > 249999) {
      costsPerContact = 1.55;
    } else if (Number(inputValues.cardsSent) > 49999) {
      costsPerContact = 1.8;
    } else if (Number(inputValues.cardsSent) > 9999) {
      costsPerContact = 2.15;
    } else if (Number(inputValues.cardsSent) > 4999) {
      costsPerContact = 2.3;
    } else if (Number(inputValues.cardsSent) > 2999) {
      costsPerContact = 2.55;
    } else if (Number(inputValues.cardsSent) > 1999) {
      costsPerContact = 2.8;
    } else if (Number(inputValues.cardsSent) > 999) {
      costsPerContact = 3.0;
    } else {
      costsPerContact = 3.25;
    }

    // Simply Noted Budget
    let simplyNotedBudget = Number(inputValues.cardsSent) * costsPerContact;

    // Costs per lead
    let costsPerLead =
      (costsPerContact / Number(inputValues.responseRate)) * 100;

    // Costs per demo
    let costsPerDemo = (costsPerLead / Number(inputValues.demoLead)) * 100;

    // Total closed Deals
    let totalClosedDeals =
      Number(inputValues.cardsSent) *
      (Number(inputValues.responseRate) / 100) *
      (Number(inputValues.demoLead) / 100) *
      (Number(inputValues.demoShow) / 100) *
      (Number(inputValues.demoClose) / 100);

    // CPA
    let CPA =
      Number(costsPerDemo) /
      (Number(inputValues.demoShow) / 100) /
      (Number(inputValues.demoClose) / 100);

    // CPA (conv w/ commission)
    let CPAcom = Number(inputValues.averageCustomer) * 0.1;

    // CPA (total)
    let CPAtotal = CPAcom + CPA;

    // ROI (total sales)
    let ROItotal = totalClosedDeals * Number(inputValues.averageCustomer);

    // ROI (percentage)
    let ROIpercentage =
      ((ROItotal - simplyNotedBudget) / simplyNotedBudget) * 100;

    setOutputValues({
      costsPerContact,
      simplyNotedBudget,
      costsPerLead,
      costsPerDemo,
      totalClosedDeals,
      CPAcom,
      CPAtotal,
      ROItotal,
      ROIpercentage,
    });
  }, [inputValues]);

  return (
    <>
      <section className="roi-calculator-section-1">
        <div className="roi-container">
          <div className="simply-noted-marketing">
            <div className="mt-0 mb-[100px]">
              <h3 className="category-heading"></h3>
              <h3 className="category-heading-mobile"></h3>
              <div className="roi-container">
                <div className="mt-0">
                  <div className="roi-container">
                    <div className="roi-calculator mb-[100px]">
                      <div className="roi-calculator-input-wrapper">
                        <div className="input-holders">
                          <div className="roi-small-heading">
                            Adjust the sliders below to calculate your ROI
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Cards Sent</h4>
                              <p className="roi-text-right">
                                {inputValues.cardsSent}
                              </p>
                            </div>
                            <input
                              type="range"
                              name="points"
                              min="0"
                              max="100000"
                              value={inputValues.cardsSent}
                              onChange={(event) => {
                                setInputValues((prevInputValues) => {
                                  return {
                                    ...prevInputValues,
                                    cardsSent: event.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Response Rate</h4>
                              <p className="roi-text-right">
                                {`${inputValues.responseRate}%`}
                              </p>
                            </div>
                            <input
                              type="range"
                              name="points"
                              min="0.5"
                              max="100"
                              value={inputValues.responseRate}
                              onChange={(event) => {
                                setInputValues((prevInputValues) => {
                                  return {
                                    ...prevInputValues,
                                    responseRate: event.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Demo/Lead %</h4>
                              <p className="roi-text-right">
                                {`${inputValues.demoLead}%`}
                              </p>
                            </div>
                            <input
                              type="range"
                              name="points"
                              min="0"
                              max="100"
                              value={inputValues.demoLead}
                              onChange={(event) => {
                                setInputValues((prevInputValues) => {
                                  return {
                                    ...prevInputValues,
                                    demoLead: event.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Demo Show Up Rate</h4>
                              <p className="roi-text-right">
                                {`${inputValues.demoShow}%`}
                              </p>
                            </div>
                            <input
                              type="range"
                              name="points"
                              min="0"
                              max="100"
                              value={inputValues.demoShow}
                              onChange={(event) => {
                                setInputValues((prevInputValues) => {
                                  return {
                                    ...prevInputValues,
                                    demoShow: event.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Demo Close Rate</h4>
                              <p className="roi-text-right">
                                {`${inputValues.demoClose}%`}
                              </p>
                            </div>
                            <input
                              type="range"
                              name="points"
                              min="0"
                              max="100"
                              value={inputValues.demoClose}
                              onChange={(event) => {
                                setInputValues((prevInputValues) => {
                                  return {
                                    ...prevInputValues,
                                    demoClose: event.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Avg. Sale Value</h4>
                              <p className="roi-text-right">
                                {`$${prettyFormatNumber(
                                  Number(inputValues.averageCustomer),
                                )}`}
                              </p>
                            </div>
                            <input
                              type="range"
                              name="points"
                              min="0"
                              max="100000"
                              value={inputValues.averageCustomer}
                              onChange={(event) => {
                                setInputValues((prevInputValues) => {
                                  return {
                                    ...prevInputValues,
                                    averageCustomer: event.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="roi-leading-arrow">
                          <img
                            className="align-middle"
                            src={RoiLeadingArrowImage}
                            alt="leading arrow image"
                          />
                        </div>
                      </div>
                      <div className="roi-calculator-output-wrapper">
                        <div className="roiNumbers">
                          <div className="output-holders">
                            <div className="roi-diveder-line"></div>
                            <h2>ROI Breakdown</h2>
                            <div className="roi-small-heading"></div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Simply Noted Budget</h4>
                                <h4 className="roi-text-num">
                                  {`$${prettyFormatNumber(
                                    Number(
                                      outputValues.simplyNotedBudget.toFixed(2),
                                    ),
                                  )}`}
                                </h4>
                              </div>
                              <div className="output-item">
                                <p>Cards Sent</p>
                                <p className="roi-text-right">
                                  {prettyFormatNumber(inputValues.cardsSent)}
                                </p>
                              </div>
                              <div className="output-item">
                                <p>Cost Per Contact Hit By Simply Noted</p>
                                <p className="roi-text-right">
                                  {`$${outputValues.costsPerContact}`}
                                </p>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Response Rate</h4>
                                <h4 className="roi-text-num">
                                  {`${inputValues.responseRate}%`}
                                </h4>
                              </div>
                              <div className="output-item">
                                <p>Cost Per Lead</p>
                                <p className="roi-text-right">
                                  {`$${outputValues.costsPerLead.toFixed(2)}`}
                                </p>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Demo Lead %</h4>
                                <h4 className="roi-text-num">
                                  {`${inputValues.demoLead}%`}
                                </h4>
                              </div>
                              <div className="output-item">
                                <p>Cost Per Demo</p>
                                <p className="roi-text-right">
                                  {`$${outputValues.costsPerDemo.toFixed(2)}`}
                                </p>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Demo Show Up Rate %</h4>
                                <h4 className="roi-text-num">
                                  {`${inputValues.demoShow}%`}
                                </h4>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Demo Close Rate</h4>
                                <h4 className="roi-text-num">
                                  {`${inputValues.demoClose}%`}
                                </h4>
                              </div>
                              <div className="output-item">
                                <p>Total Close Deals</p>
                                <p className="roi-text-right">
                                  {outputValues.totalClosedDeals.toFixed(2)}
                                </p>
                              </div>
                              <div className="output-item">
                                <p className='w-[78%]'>
                                  Sales Rep Commission (% of Gross Contribution)
                                </p>
                                <p className="roi-text-right">10%</p>
                              </div>
                              <div className="output-item">
                                <p>CPA (Conversion w/ Commission)</p>
                                <p className="roi-text-right">
                                  {`$${outputValues.CPAcom.toFixed(2)}`}
                                </p>
                              </div>
                              <div className="output-item">
                                <p>CPA (Total: Cost + Commission)</p>
                                <p className="roi-text-right">
                                  {`$${outputValues.CPAtotal.toFixed(2)}`}
                                </p>
                              </div>
                            </div>
                            <div
                              className="output-holder"
                              style={{paddingBottom: '20px'}}
                            >
                              <div className="output-item">
                                <h4>Average Customer Sale Value</h4>
                                <h4 className="roi-text-num">
                                  {`$${prettyFormatNumber(
                                    inputValues.averageCustomer,
                                  )}`}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="roi-totals">
                            <div className="output-holder mb-2">
                              <div className="output-item">
                                <h4 className='roi-total-head'>ROI (Percentage)</h4>
                                <h4 className="roi-total-value">
                                  {`${outputValues.ROIpercentage.toFixed(2)}%`}
                                </h4>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4 className='roi-total-head' >ROI (Total Sales)</h4>
                                <h4 className="roi-total-value">
                                  {`${prettyFormatNumber(
                                    Number(outputValues.ROItotal.toFixed(2)),
                                  )}`}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="roi-robot-cont">
            <img
              className="align-middle"
              src={RoiRobotImage}
              alt="Roi robot image"
            />
          </div>
        </div>
        
      <div className="lg:w-full md:w-[90%] mx-auto overflow-hidden relative">
        
        <div className="banner-detail text-center relative w-[70%] mx-auto !h-[302px]">
       
       
          <img className="lg:block hidden absolute mt-[-217px] right-[-268px] w-[42%] flex-row " src="https://simplynoted.com/cdn/shop/files/calculator-pens.png?v=16934020513361355499" alt="shopify" />
         <div></div>
         <div className="md:flex-row flex-col mx-auto w-full">
            <DynamicButton
                    text=""
                    className="req-btn "
                  
            />
            <DynamicButton
                    text=""
                    className="sch-btn"
     
                
            />
</div>
            </div>
          </div>
          
        
       
  
      </section>
    </>
  );
}
