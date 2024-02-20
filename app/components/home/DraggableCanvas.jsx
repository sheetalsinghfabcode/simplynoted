import React, {useEffect, useRef, useState} from 'react';
import CanvasTopImage from '../../../assets/Image/CanvasTopImage.webp';
import CanvasBaseImage from '../../../assets/Image/CanvasBaseImage.jpg';

const DraggableCanvas = () => {
  const [clipValue, setClipValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredBackground, setIsHoveredBackground] = useState({
    isHoveredOnParent: false,
    isHoveredOnVerticalLine: false,
  });
  const verticalLineRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const updateClip = (clientX) => {
    if (verticalLineRef.current) {
      const container = verticalLineRef.current.parentElement;
      const containerRect = container.getBoundingClientRect();

      const newClipValue =
        ((clientX - containerRect.left) / containerRect.width) * 100;
      // To ensure it is < 100
      setClipValue(Math.max(0, Math.min(100, newClipValue)));
    }
  };

  const enableBGOnParentHover = () => {
    setIsHoveredBackground((prevHoveredValues) => {
      return {
        ...prevHoveredValues,
        isHoveredOnParent: true,
      };
    });
  };

  const disableBGFOnParentHover = () => {
    setIsHoveredBackground((prevHoveredValues) => {
      return {
        ...prevHoveredValues,
        isHoveredOnParent: false,
      };
    });
  };

  const enableBGOnVerticalLineHover = () => {
    setIsHoveredBackground({
      isHoveredOnVerticalLine: true,
      isHoveredOnParent: false,
    });
  };

  const disableBGOnVerticalLineHover = () => {
    setIsHoveredBackground({
      isHoveredOnVerticalLine: false,
      isHoveredOnParent: true,
    });
  };

  useEffect(() => {
    const handleReleasingEvent = () => {
      console.log('mouse stopped moving');
      setIsDragging(false);
    };
    const handleMovementEvent = (e) => {
      console.log('mouse is moving');
      updateClip(e.clientX);
      if (hoveredBackground.isHoveredOnParent) {
        setIsHoveredBackground((prevHoveredValues) => {
          return {
            ...prevHoveredValues,
            isHoveredOnParent: false,
          };
        });
      }
    };

    // when mouse is being moved
    if (isDragging) {
      document.addEventListener('mousemove', handleMovementEvent);
      document.addEventListener('touchmove', handleMovementEvent);

      // when mouse click is released
      document.addEventListener('mouseup', handleReleasingEvent);
      document.addEventListener('touchend', handleReleasingEvent);
    }

    return () => {
      document.removeEventListener('mouseup', handleReleasingEvent);
      document.removeEventListener('touchend', handleReleasingEvent);
      document.removeEventListener('mousemove', handleMovementEvent);
      document.removeEventListener('touchmove', handleMovementEvent);
    };
  }, [isDragging]);

  return (
    <div className="bg-[#324879] flex flex-col gap-[10px] pt-[35px] pb-[35px] items-center justify-center">
      <div className="text-white -tracking-[1.2px] mb-[25px] font-bold text-[25px] md:text-[30px]">
        Real Handwritten Notes
      </div>
      {/* side divs with canvas  */}
      <div className="w-full relative flex justify-center">
        <div className="hidden lg:block absolute top-0 left-0 w-full h-full w-[25vw]">
         
        </div>
        <div className="hidden lg:block absolute top-0 right-0 w-full h-full w-[25vw]">
         
        </div>
        {/* Canvas div itself */}
        <div
          className="relative w-[90vw] max-w-[640px] overflow-hidden"
          onMouseOver={enableBGOnParentHover}
          onMouseOut={disableBGFOnParentHover}
        >
          <img
            className="w-full h-full object-cover select-none"
            src={CanvasBaseImage}
            alt="canvas-base-image"
          />
          <div className="absolute top-0 right-0 left-0 bottom-0  overflow-hidden">
            <img
              className="w-full h-full object-cover select-none"
              style={{
                clipPath: `inset(0% 0% 0% ${clipValue}%)`,
              }}
              src={CanvasTopImage}
              alt="canvas-top-image"
            />
          </div>
          <div
            className={`${
              hoveredBackground.isHoveredOnParent &&
              !hoveredBackground.isHoveredOnVerticalLine
                ? 'bg-opacity-40'
                : 'bg-opacity-0'
            } bg-black z-[10] absolute top-0 right-0 left-0 bottom-0  overflow-hidden flex justify-center items-center transition-all duration-500 ease-in-out delay-100`}
          >
            <div className="flex-1 hidden md:block text-white">
              <div
                className={`${
                  hoveredBackground.isHoveredOnParent &&
                  !hoveredBackground.isHoveredOnVerticalLine
                    ? 'bg-opacity-10'
                    : 'bg-opacity-0'
                } ml-2 select-none bg-black text-[13px] pr-[20px] pl-[20px] h-[38px] w-[73px] flex justify-around items-center rounded transition-all duration-500 ease-in-out delay-100`}
              >
                Before
              </div>
            </div>
            <div className="flex-1 flex justify-end text-white">
              <div
                className={`${
                  hoveredBackground.isHoveredOnParent &&
                  !hoveredBackground.isHoveredOnVerticalLine
                    ? 'bg-opacity-10'
                    : 'bg-opacity-0'
                } mr-2 mt-[4px] select-none bg-black text-[13px] pr-[20px] pl-[20px] h-[38px] w-[73px] flex justify-around items-center justify-end rounded transition-all duration-500 ease-in-out delay-100`}
              >
                After
              </div>
            </div>
          </div>
          <div
            ref={verticalLineRef}
            className="absolute cursor-ew-resize top-0 w-[3px] h-full z-[30] bg-white -translate-x-[50%] select-none"
            style={{
              left: `${clipValue}%`,
              boxShadow: '0 -3px #fff, 0 0 12px #33333380',
            }}
            onMouseDown={handleMouseDown}
            onMouseOver={enableBGOnVerticalLineHover}
            onMouseOut={disableBGOnVerticalLineHover}
          />
          <div
            className="absolute cursor-ew-resize h-[38px] w-[38px] z-[20] top-[50%] border-[3px] border-white rounded-full"
            style={{
              left: `${clipValue}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 #fff, 0 0 12px #33333380',
            }}
            onMouseDown={handleMouseDown}
            onMouseOver={enableBGOnVerticalLineHover}
            onMouseOut={disableBGOnVerticalLineHover}
          />
        </div>
      </div>
    </div>
  );
};

export default DraggableCanvas;
