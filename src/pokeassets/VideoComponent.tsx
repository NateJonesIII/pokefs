// VideoComponent.tsx
import React from 'react';
import vid from '../assets/poke_vid.webm';

const VideoComponent: React.FC = () => {
  return (
    <div className="video-container">
      <div className="video-wrapper">
        <video width="560" height="315" controls>
          <source src={vid} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoComponent;
