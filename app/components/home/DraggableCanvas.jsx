import React, {useEffect, useRef, useState} from 'react';
import CanvasTopImage from '../../../assets/Image/CanvasTopImage.webp';
import CanvasBaseImage from '../../../assets/Image/CanvasBaseImage.jpg';

const DraggableCanvas = () => {
  const [clipValue, setClipValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
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

  useEffect(() => {
    const handleReleasingEvent = () => {
      console.log('mouse stopped moving');
      setIsDragging(false);
    };
    const handleMovementEvent = (e) => {
      console.log('mouse is moving');
      updateClip(e.clientX);
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
      <div className="relative w-[90vw] max-w-[550px] bg-image bg-cover bg-center bg-no-repeat">
        <img src={CanvasBaseImage} alt="canvas-base-image" />
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
          ref={verticalLineRef}
          className="absolute cursor-ew-resize top-0 w-[4px] h-full bg-black -translate-x-[50%] select-none"
          style={{
            left: `${clipValue}%`,
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default DraggableCanvas;
