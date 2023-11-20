import React, {useState} from 'react';

function roicalculator() {
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  return (
    <div>
      <div className="max-w-full m-[73px] h-[814px] bg-white">
        <div className="mt-[19px] flex justify-center">
          <img
            className="mt-[16px]"
            src="https://simplynoted.com/cdn/shop/files/calculator-underline.png"
          />
        </div>
        <br />
        <div className="left-right-main-cont flex justify-around">
          <div className="roi-left-cont h-[646px] w-2/5">
            <div className="">
              <h2 className="">
                Adjust the sliders below to calculate your ROI
              </h2>
            </div>
            <div className="input-feild">
              <input
                onChange={handleChange}
                min="0.000"
                max="100,000"
                value={inputValue}
                type="range"
                id="myRange"
              ></input>
            </div>
          </div>
          <div className="roi-right-cont border h-[646px] w-2/5 bg-gray-200">
            <div className="roi-breakdown m-[12px]">
              <h1 className="text-[28px] font-extrabold text-blue-900">
                ROI Breakdown
              </h1>
              <div className="first-value">
                <div className="flex justify-between mt-[18px]">
                  <span className="font-bold text-lg">Simply Noted Budget</span>
                  <p>${inputValue}</p>
                </div>
              </div>
              <div className="sec-value">
                <div className="flex justify-between mt-[9px]">
                  <span>Cards Sent</span>
                  <p>0</p>
                </div>
              </div>
              <div className="third-value">
                <div className="flex justify-between mt-[9px]">
                  <span>Cost Per Contact Hit By Simply Noted</span>
                  <p>$3.25</p>
                </div>
              </div>
              <div className="fourth-value">
                <div className="flex justify-between mt-[9px]">
                  <span className="font-bold text-lg">Response Rate</span>
                  <p>0.5%</p>
                </div>
              </div>
              <div className="fifth-value">
                <div className="flex justify-between mt-[9px]">
                  <span>CCost Per Lead</span>
                  <p>$650.00</p>
                </div>
              </div>
              <div className="sixth-value">
                <div className="flex justify-between mt-[9px]">
                  <span className="font-bold text-lg">Demo Lead %</span>
                  <p>100%</p>
                </div>
              </div>
              <div className="seventh-value">
                <div className="flex justify-between mt-[9px]">
                  <span>Cost Per Demo</span>
                  <p>$650.00</p>
                </div>
              </div>
              <div className="eigth-value">
                <div className="flex justify-between mt-[9px]">
                  <span className="font-bold text-lg">Demo Show Up Rate %</span>
                  <p>100%</p>
                </div>
              </div>
              <div className="ninth-value">
                <div className="flex justify-between mt-[9px]">
                  <span className="font-bold text-lg">Demo Close Rate</span>
                  <p>0%</p>
                </div>
              </div>
              <div className="tenth-value">
                <div className="flex justify-between mt-[9px]">
                  <span>Total Close Deals</span>
                  <p>0.00</p>
                </div>
              </div>
              <div className="eleventh-value">
                <div className="flex justify-between mt-[9px]">
                  <span>TSales Rep Commission (% of Gross Contribution)</span>
                  <p>10%</p>
                </div>
              </div>
              <div className="twelve-value">
                <div className="flex justify-between mt-[9px]">
                  <span>CPA (Conversion w/ Commission)</span>
                  <p>$500.00</p>
                </div>
              </div>
              <div className="thirteen-value">
                <div className="flex justify-between mt-[9px]">
                  <span>CPA (Total: Cost + Commission)</span>
                  <p>$Infinity</p>
                </div>
              </div>
              <div className="fourteen-value">
                <div className="flex justify-between mt-[9px]">
                  <span className="font-bold text-lg">
                    Average Customer Sale Value
                  </span>
                  <p>$5,000</p>
                </div>
              </div>
              <div className="roi-total mt-[20px]">
                <div className="flex justify-between">
                  <div className="text-white font-medium text-[19px]">
                    ROI (Percentage)
                  </div>
                  <div className="">6540.63%</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-white font-medium text-[19px]">
                    ROI (Total Sales)
                  </div>
                  <div className="">$11,953,125</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="roi-images relative right-[-24px]">
        <img src="https://simplynoted.com/cdn/shop/files/calculator-callout.png" />
        <button
          className="integrate-button absolute right-[350px] top-[127px] h-[46px] w-[247px]  p-[12px] bg-rose-500"
          type="button"
        ></button>
        <button
          className="integrate-button border-2 border-white absolute right-[83px] top-[127px] h-[46px] w-[247px]  p-[12px]"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default roicalculator;
