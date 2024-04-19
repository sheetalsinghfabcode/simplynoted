import FlatBlankCanvasImage from '../../../assets/Image/flat-blank-canvas.png';
import FoldedBlankCanvasImage from '../../../assets/Image/folded-blank-canvas.png';
import FlatCardTypeOptionImage from '../../../assets/Image/flat-green.png';
import FoldedCardTypeOptionImage from '../../../assets/Image/folded-green.png';

export default function CardTypeSelection({
  isFlatCardType,
  setIsFlatCardType,
  setIsCardTypeSelectionPage,
}) {
  const handleCardTypeSelectionButton = (e) => {
    e.preventDefault();
    setIsCardTypeSelectionPage(false);
  };

  return (
    <section className="flex lg:flex-row flex-col global-max-width-handler justify-center items-center  !mt-20  flex-wrap xl:gap-0  lg:gap-[6rem] gap-5 ">
      <div className='border border-[#f2f2f2] w-full flex items-center lg:flex-row flex-col bg-[#fafafa] lg:p-0 py-10 px-4'>
      <div className="md:flex hidden items-center justify-center flex-1 ">
        <div className="w-full">
          <img
            src={isFlatCardType ? FlatBlankCanvasImage : FoldedBlankCanvasImage}
            alt="Selected blank canvas image on card selection"
            draggable="false"
          />
        </div>
      </div>
      <div className="md:flex  justify-center flex  flex-1">
        <div className="flex flex-col  max-w-[300px]">
          <span className=" text-center text-[17px] text-black font-bold">
            Start by selecting the size and style of card you want to create.
          </span>
          <div className="flex flex-col justify-center  items-center">
            <div className="flex justify-center h-[88px] my-8 w-[90%]">
              <div
                className="p-4 md:p-6 flex justify-center items-center flex-1 cursor-pointer"
                style={{
                  backgroundColor: isFlatCardType
                    ? 'rgb(239, 110, 110)'
                    : 'white',
                }}
                onClick={() => setIsFlatCardType(true)}
              >
                <img
                  src={FlatCardTypeOptionImage}
                  alt="Option: Flat card type option image"
                  draggable="false"
                />
              </div>
              <div
                className="p-4 md:p-6 flex justify-center items-center flex-1 cursor-pointer"
                style={{
                  backgroundColor: isFlatCardType
                    ? 'white'
                    : 'rgb(239, 110, 110)',
                }}
                onClick={() => setIsFlatCardType(false)}
              >
                <img
                  src={FoldedCardTypeOptionImage}
                  alt="Option: Folded card type option image"
                  draggable="false"
                />
              </div>
            </div>
            <button
              className="w-full bg-[#1b5299] text-white cursor-pointer font-normal text-[14px] pt-4 pb-4 flex justify-center items-center"
              onClick={handleCardTypeSelectionButton}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
