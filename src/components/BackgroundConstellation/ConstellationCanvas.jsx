import React, { useRef } from 'react';
import useConstellationLogic from './useConstellationLogic';
import '../../styles/constellation.css';

const ConstellationCanvas = () => {
  const canvasRef = useRef(null);
  useConstellationLogic(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="constellation-canvas"
    />
  );
};

export default ConstellationCanvas; 