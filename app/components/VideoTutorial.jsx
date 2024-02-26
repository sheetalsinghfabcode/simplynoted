import React from 'react';

export const VideoTutorial = () => {
  return (
    <div className='mt-[20px]'>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/hEzSeiixgqw?si=gO9Wa4JRfMXwkoy-"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};
