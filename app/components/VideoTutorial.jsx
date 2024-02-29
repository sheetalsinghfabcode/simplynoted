import React from 'react';

export const VideoTutorial = () => {
  return (
    // <div className='mt-[20px]'>
    //   {/* <video
    //     // width="560"
    //     // height="315"
    //     data-yt2html5="https://www.youtube.com/embed/hEzSeiixgqw?si=gO9Wa4JRfMXwkoy-"
    //     // title="YouTube video player"
    //     // frameborder="0"
    //     // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //     // allowFullScreen
    //   ></video> */}
    //   {/* <video controls="controls" class="video-stream" x-webkit-airplay="allow"  src="https://www.youtube.com/embed/hEzSeiixgqw?si=gO9Wa4JRfMXwkoy-"></video> */}
    //   <video controls="true">
    //     <source src="https://www.youtube.com/embed/hEzSeiixgqw?si=gO9Wa4JRfMXwkoy-" type="video/mp4" />
    // </video>
    // </div>
    <div class="containerxyz">
    <div class="ratio ratio-16x9">
      <iframe 
        src="https://www.youtube.com/embed/hEzSeiixgqw?si=gO9Wa4JRfMXwkoy-" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        class="w-full h-full"
      ></iframe>
    </div>
  </div>
  
  );
};
