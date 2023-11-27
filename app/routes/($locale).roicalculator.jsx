import RoiLeadingArrowImage from '../../assets/Image/roi-leading-arrow.webp';
import RoiRobotImage from '../../assets/Image/roi-robot.webp';

export default function RoiCalculator() {
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
                              <p
                                id="cards-sent-label"
                                className="roi-text-right"
                              >
                                10,000
                              </p>
                            </div>
                            <input
                              id="cards-sent-range"
                              type="range"
                              name="points"
                              min="0"
                              max="100000"
                              value="10000"
                              onchange="calculate();"
                              oninput="outputInput();"
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Response Rate</h4>
                              <p
                                id="response-rate-label"
                                className="roi-text-right"
                              >
                                8%
                              </p>
                            </div>
                            <input
                              id="response-rate-range"
                              type="range"
                              name="points"
                              min="0.5"
                              max="100"
                              value="8"
                              onchange="calculate();"
                              oninput="outputInput();"
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Demo/Lead %</h4>
                              <p
                                id="demo-lead-label"
                                className="roi-text-right"
                              >
                                75%
                              </p>
                            </div>
                            <input
                              id="demo-lead-range"
                              type="range"
                              name="points"
                              min="0"
                              max="100"
                              value="75"
                              onchange="calculate();"
                              oninput="outputInput();"
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Demo Show Up Rate</h4>
                              <p
                                id="demo-show-label"
                                className="roi-text-right"
                              >
                                75%
                              </p>
                            </div>
                            <input
                              id="demo-show-range"
                              type="range"
                              name="points"
                              min="0"
                              max="100"
                              value="75"
                              onchange="calculate();"
                              oninput="outputInput();"
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Demo Close Rate</h4>
                              <p
                                id="demo-close-label"
                                className="roi-text-right"
                              >
                                50%
                              </p>
                            </div>
                            <input
                              id="demo-close-range"
                              type="range"
                              name="points"
                              min="0"
                              max="100"
                              value="50"
                              onchange="calculate();"
                              oninput="outputInput();"
                            />
                          </div>
                          <div className="input-holder">
                            <div className="input-header">
                              <h4>Avg. Sale Value</h4>
                              <p
                                id="average-customer-label"
                                className="roi-text-right"
                              >
                                $5,000
                              </p>
                            </div>
                            <input
                              id="average-customer-range"
                              type="range"
                              name="points"
                              min="0"
                              max="100000"
                              value="5000"
                              onchange="calculate();"
                              oninput="outputInput();"
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
                                <h4
                                  id="nasted-budget-output"
                                  className="roi-text-right"
                                >
                                  $21,500
                                </h4>
                              </div>
                              <div className="output-item">
                                <p>Cards Sent</p>
                                <p
                                  id="cards-sent-output"
                                  className="roi-text-right"
                                >
                                  10,000
                                </p>
                              </div>
                              <div className="output-item">
                                <p>Cost Per Contact Hit By Simply Noted</p>
                                <p
                                  id="cost-contact-output"
                                  className="roi-text-right"
                                >
                                  $2.15
                                </p>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Response Rate</h4>
                                <h4
                                  id="response-rate-output"
                                  className="roi-text-right"
                                >
                                  8.5%
                                </h4>
                              </div>
                              <div className="output-item">
                                <p>Cost Per Lead</p>
                                <p
                                  id="cost-lead-output"
                                  className="roi-text-right"
                                >
                                  $25.29
                                </p>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Demo Lead %</h4>
                                <h4
                                  id="demo-lead-output"
                                  className="roi-text-right"
                                >
                                  75%
                                </h4>
                              </div>
                              <div className="output-item">
                                <p>Cost Per Demo</p>
                                <p
                                  id="cost-demo-output"
                                  className="roi-text-right"
                                >
                                  $33.73
                                </p>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Demo Show Up Rate %</h4>
                                <h4
                                  id="demo-show-output"
                                  className="roi-text-right"
                                >
                                  75%
                                </h4>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>Demo Close Rate</h4>
                                <h4
                                  id="demo-close-output"
                                  className="roi-text-right"
                                >
                                  50%
                                </h4>
                              </div>
                              <div className="output-item">
                                <p>Total Close Deals</p>
                                <p
                                  id="total-close-output"
                                  className="roi-text-right"
                                >
                                  239.06
                                </p>
                              </div>
                              <div className="output-item">
                                <p>
                                  Sales Rep Commission (% of Gross Contribution)
                                </p>
                                <p
                                  id="sales-commissiom-output"
                                  className="roi-text-right"
                                >
                                  10%
                                </p>
                              </div>
                              <div className="output-item">
                                <p>CPA (Conversion w/ Commission)</p>
                                <p
                                  id="cpa-conv-output"
                                  className="roi-text-right"
                                >
                                  $500.00
                                </p>
                              </div>
                              <div className="output-item">
                                <p>CPA (Total: Cost + Commission)</p>
                                <p
                                  id="cpa-total-output"
                                  className="roi-text-right"
                                >
                                  $589.93
                                </p>
                              </div>
                            </div>
                            <div
                              className="output-holder"
                              style={{paddingBottom: '20px'}}
                            >
                              <div className="output-item">
                                <h4>Average Customer Sale Value</h4>
                                <h4
                                  id="avg-customer-output"
                                  className="roi-text-right"
                                >
                                  $5,000
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="roi-totals">
                            <div className="output-holder mb-2">
                              <div className="output-item">
                                <h4>ROI (Percentage)</h4>
                                <h4
                                  id="roi-percentage-output"
                                  className="roi-text-right"
                                >
                                  5459.59%
                                </h4>
                              </div>
                            </div>
                            <div className="output-holder">
                              <div className="output-item">
                                <h4>ROI (Total Sales)</h4>
                                <h4
                                  id="roi-total-output"
                                  className="roi-text-right"
                                >
                                  $1,195,312.5
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
      </section>
    </>
  );
}
