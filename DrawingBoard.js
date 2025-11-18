import React, { useState, useRef, useEffect } from 'react';
import './DrawingBoard.css';  // 引入卡通风格的CSS样式

function DrawingBoard() {
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [path, setPath] = useState([]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    const startPos = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setPath([{ x: startPos.x, y: startPos.y }]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const newPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setPath((prev) => [...prev, newPoint]);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  useEffect(() => {
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    const leftCtx = leftCanvas.getContext('2d');
    const rightCtx = rightCanvas.getContext('2d');

    // 清空右侧画布
    rightCtx.clearRect(0, 0, rightCanvas.width, rightCanvas.height);

    // 在右侧画布上绘制路径
    rightCtx.beginPath();
    path.forEach((point, index) => {
      if (index === 0) {
        rightCtx.moveTo(point.x, point.y);
      } else {
        rightCtx.lineTo(point.x, point.y);
      }
    });
    rightCtx.stroke();
  }, [path]);

  return (
    <div className="drawing-board-container">
      <div className="canvas-container">
        <canvas
          ref={leftCanvasRef}
          width="500"
          height="500"
          className="left-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className="canvas-container">
        <canvas
          ref={rightCanvasRef}
          width="500"
          height="500"
          className="right-canvas"
        />
      </div>
    </div>
  );
}

export default DrawingBoard;
