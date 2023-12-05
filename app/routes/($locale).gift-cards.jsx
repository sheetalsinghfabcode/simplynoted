const Gift_card = () => {
  return (
    <>
      <div className="mt-5">
        <div className="p-[30px] w-[100%] max-w-[1400px] mx-auto">
          <h1 className="text-[50px] leading-10 pb-[17px] tracking-wide text-center font-karla text-[#001a5f] ">
            Gift Cards
            </h1>
            <p className="text-[#001a5f] lg:text-center text-justify md:w-[60%] w-[90%] my-0 mx-auto text-[16px] text-bold font-karla">
              Send any of these gift cards along with your handwritten cards to
              make a lasting impression on your recipients! You can add gift
              cards during the card order process. Gift cards are also available
              through our API and Zapier interfaces.
            </p>
            <div className="flex mt-[50px] justify-between lg:flex-row flex-col lg:items-left items-center">
              <div className="grid lg:grid-cols-3 .grid-cols-1 gap-[30px] lg:w-[60%] md:w-[30%] sm:w-[40%] w-[60%]">
                <div className="grid">
                  <div>
                    <img
                      className="p-0 m-0 h-auto static"
                      src="https://simplynoted.com/cdn/shop/products/238-2382973_gift-card-starbucks-starbucks-gift-card-10_db5e45a6-bddf-4566-8228-e53482cc35a2.png?v=1650636251"
                      alt="gift-card"
                    />
                  </div>
                  <div className="font-karla pt-[10px]">
                    <span className=" text-[22px] text-bold text-black">
                      Starbucks Gift Card
                    </span>
                    <p className=" text-[15px] text-medium">
                      Choose from $5, $10, $25, $50.
                      <b />
                      $2.95 processing fee added to each card.
                    </p>
                  </div>
                </div>

                <div className="grid">
                  <div>
                    <img
                      className="p-0 m-0 h-auto static"
                      src="https://simplynoted.com/cdn/shop/files/anazongift_26a84f17-c3d0-487e-ac1f-88689acd71ea.png?v=1697814234"
                      alt="gift-card"
                    />
                  </div>
                  <div className="font-karla pt-[10px]">
                    <span className="text-[22px] text-bold text-black">
                      Amazon Gift Card
                    </span>
                    <p className="text-[15px] text-medium">
                      Choose from  $10, $25, $50.
                      <b />
                      $2.95 processing fee added to each card.
                    </p>
                  </div>
                </div>

                <div className="grid">
                  <div>
                    <img
                      className="p-0 m-0 h-auto static"
                      src="https://simplynoted.com/cdn/shop/products/visaa_d0ecd136-50ad-4d86-b46e-c2cf128b1226.jpg?v=1650637201"
                      alt="gift-card"
                    />
                  </div>
                  <div className="font-karla pt-[10px]">
                    <span className="text-[22px] text-bold text-black">
                      Visa Gift Card
                    </span>
                    <p className=" text-[15px] text-medium">
                      Choose from $25, $50,$100.
                      <b />
                      $2.95 processing fee added to each card.
                    </p>
                  </div>
                </div>

                <div className="grid">
                  <div>
                    <img
                      className="p-0 m-0 h-auto static"
                      src="https://simplynoted.com/cdn/shop/products/Home-Depot-Gift-Card_5f2d0c10-03b8-4c53-97ab-4c7e3ff70557.png?v=1650639127"
                      alt="gift-card"
                    />
                  </div>
                  <div className="font-karla pt-[10px]">
                    <span className="text-[22px] text-bold text-black">
                      Home Depot Gift Card
                    </span>
                    <p className=" text-[15px] text-medium">
                      Choose from $25, $50, $100, $20.
                      <b />
                      $2.95 processing fee added to each card.
                    </p>
                  </div>
                </div>

                <div className="grid">
                  <div>
                    <img
                      className="p-0 m-0 h-auto static"
                      src="https://simplynoted.com/cdn/shop/products/lowes_ba63fd48-039b-4a8c-9b55-8f89bf18286a.jpg?v=1650635129"
                      alt="gift-card"
                    />
                  </div>
                  <div className="font-karla pt-[10px]">
                    <span className=" text-[22px] text-bold text-black">
                      Lowe's Gift Card
                    </span>
                    <p className=" text-[15px] text-medium">
                      Choose from $25, $50, $100, $200.
                      <b />
                      $2.95 processing fee added to each card.
                    </p>
                  </div>
                </div>

              </div>
              <div className="md:w-40% sm:w-[50%] w-[60%] " >
                <img className="" src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/giftCard2.gif?v=1614385813" alt="robot"/>
              </div>
            </div>
     
        </div>
      </div>
    </>
  );
};

export default Gift_card;
