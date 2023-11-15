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
    <section className="flex justify-center items-center min-h-[450px] mt-7 flex-wrap gap-5">
      <div className="flex items-center justify-end flex-1 mr-10">
        <div className="w-[495px] h-[350px] ml-7">
          <img
            src={isFlatCardType ? FlatBlankCanvasImage : FoldedBlankCanvasImage}
            alt="Selected blank canvas image on card selection"
            draggable="false"
          />
        </div>
      </div>
      <div className="flex items-start justify-start ml-10 mb-10 flex-1">
        <div className="flex flex-col h-[300px] w-[273px] mr-7">
          <span className="font-semibold text-center">
            Start by selecting the size and style of card you want to create.
          </span>
          <div className="flex flex-col justify-center  items-center">
            <div className="flex justify-center bg-white h-[88px] mt-8 mb-4 w-4/5">
              <div
                className="pl-3 pr-3 flex justify-center items-center flex-1"
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
                className="pr-3 pl-3 flex justify-center items-center flex-1"
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
              className="w-full bg-[#1b5299] text-white cursor-pointer pt-4 pb-4 flex justify-center items-center"
              onClick={handleCardTypeSelectionButton}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
