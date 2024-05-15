import DynamicTitle from '~/components/Title';
import MyBusinessGiftCard from '../../assets/Image/my-business-gift-card.webp';
import StarbucksGiftCard from '../../assets/Image/starbucks-gift-card.webp';
import AmazonGiftCard from '../../assets/Image/amazon-gift-card.avif';
import VisaGiftCard from '../../assets/Image/visa-gift-card.jpg';
import HomeDepotGiftCard from '../../assets/Image/home-depot-gift-card.avif';
import LowesGiftCard from '../../assets/Image/lowes-gift-card.jpg';
import SendGiftCardRobot from '../../assets/Image/send-gift-card-robot.webp';

const Gift_card = () => {
  return (
    <>
      <div className="mt-5 global-max-width-handler">
        <div className=" w-[100%]  mx-auto">
          <DynamicTitle title="Gift Cards" />
          <div className="w-full flex sm:text-center text-justify">
            <p className="text-[#001a5f] w-[800px] my-[0px] mx-auto sm:text-[17px] text-[14px]  font-semibold ">
              Send any of these gift cards along with your handwritten cards to
              make a lasting impression on your recipients! You can add gift
              cards during the card order process. Gift cards are also available
              through our API and Zapier interfaces.
            </p>
          </div>
          <div className="flex mt-[50px] justify-between lg:flex-row flex-col lg:items-left items-center">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] lg:w-[90%] md:w-[70%] sm:w-[55%] w-[90%]">
              <div className="grid">
                <div className="">
                  <img
                    className="p-0 m-0  static  rounded-[12px] max-h-[218px] xl:h-[170px] lg:h-[150px] md:h-[200px] h-[230px] w-full "
                    src={MyBusinessGiftCard}
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
                    src={StarbucksGiftCard}
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                    Starbucks Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $5, $10, $25, $50. $2.95 processing fee added to
                    each card.
                  </p>
                </div>
              </div>

              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src={AmazonGiftCard}
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                    Amazon Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $10, $25, $50. $2.95 processing fee added to
                    each card.
                  </p>
                </div>
              </div>

              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src={VisaGiftCard}
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                    Visa Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $25, $50,$100. $2.95 processing fee added to
                    each card.
                  </p>
                </div>
              </div>

              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src={HomeDepotGiftCard}
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className="text-[22px] font-extrabold">
                    Home Depot Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $25, $50, $100, $20. $2.95 processing fee added
                    to each card.
                  </p>
                </div>
              </div>

              <div className="grid">
                <div>
                  <img
                    className="p-0 m-0 h-auto static w-full"
                    src={LowesGiftCard}
                    alt="gift-card"
                  />
                </div>
                <div className="pt-5 text-[#000]">
                  <span className=" text-[22px] font-extrabold ">
                    Lowe's Gift Card
                  </span>
                  <p className="pt-2.5 text-[15px] font-medium">
                    Choose from $25, $50, $100, $200. $2.95 processing fee added
                    to each card.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-40% sm:w-[50%] w-[60%] ">
              <img className="" src={SendGiftCardRobot} alt="robot" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gift_card;
