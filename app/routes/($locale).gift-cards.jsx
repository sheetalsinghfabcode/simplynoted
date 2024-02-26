import DynamicTitle from '~/components/Title';
const Gift_card = () => {
  return (
    <>
      <div className="mt-5 global-max-width-handler">
        <div className=" w-[100%]  mx-auto">
          <DynamicTitle
            title="Gift Cards"
          />
            <div className='w-full flex sm:text-center text-justify'>
          <p className="text-[#001a5f] w-[800px] my-[0px] mx-auto sm:text-[17px] text-[16px]  font-semibold ">
            Send any of these gift cards along with your handwritten cards to
            make a lasting impression on your recipients! You can add gift cards
            during the card order process. Gift cards are also available through
            our API and Zapier interfaces.
          </p>
          </div>
          <div className="flex mt-[50px] justify-between lg:flex-row flex-col lg:items-left items-center">
            <div className="grid lg:grid-cols-3 .grid-cols-1 gap-[30px] lg:w-[90%] md:w-[30%] sm:w-[40%] w-[90%]">
            <div className="grid">
                <div className=''>
                  <img
                    className="p-0 m-0 h-auto static  rounded-[12px] xl:max-h-[170px] lg:max-h-[132px] max-h-[200px] w-full "
                    src="https://simplynoted.com/cdn/shop/files/0fc6819ba12f512fcce1b6f7ccaa582b.jpg?v=1708348430"
                    alt="gift-card"
                  />
               </div>
                <div className="xl:pt-5 lg:pt-0 pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                  My Business Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                  $0.25 processing fee added to each card.
                  </p>
                </div>
              </div>
              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src="https://simplynoted.com/cdn/shop/products/238-2382973_gift-card-starbucks-starbucks-gift-card-10_db5e45a6-bddf-4566-8228-e53482cc35a2.png?v=1650636251"
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                    Starbucks Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $5, $10, $25, $50.
                    $2.95 processing fee added to each card.
                  </p>
                </div>
              </div>

              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src="https://simplynoted.com/cdn/shop/files/anazongift_26a84f17-c3d0-487e-ac1f-88689acd71ea.png?v=1697814234"
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                    Amazon Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $10, $25, $50.
                    $2.95 processing fee added to each card.
                  </p>
                </div>
              </div>

              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src="https://simplynoted.com/cdn/shop/products/visaa_d0ecd136-50ad-4d86-b46e-c2cf128b1226.jpg?v=1650637201"
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                    Visa Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $25, $50,$100.
                    $2.95 processing fee added to each card.
                  </p>
                </div>
              </div>

              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src="https://simplynoted.com/cdn/shop/products/Home-Depot-Gift-Card_5f2d0c10-03b8-4c53-97ab-4c7e3ff70557.png?v=1650639127"
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                    Home Depot Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $25, $50, $100, $20.
                    $2.95 processing fee added to each card.
                  </p>
                </div>
              </div>

              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src="https://simplynoted.com/cdn/shop/products/lowes_ba63fd48-039b-4a8c-9b55-8f89bf18286a.jpg?v=1650635129"
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className=" text-[22px] font-extrabold ">
                    Lowe's Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $25, $50, $100, $200.
                    $2.95 processing fee added to each card.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-40% sm:w-[50%] w-[60%] ">
              <img
                className=""
                src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/giftCard2.gif?v=1614385813"
                alt="robot"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gift_card;