import { useState } from "react";
import PropTypes from "prop-types";

const ResizableBox = ({ children, className, minWidth = 222, maxWidth = 500 }) => {
  const [width, setWidth] = useState(260); // 256px es el ancho inicial de 64rem
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (mouseDownEvent) => {
    setIsResizing(true);

    const startWidth = width;
    const startPositionX = mouseDownEvent.clientX;

    const onMove = (mouseMoveEvent) => {
      const currentWidth = startWidth + mouseMoveEvent.clientX - startPositionX;
      const newWidth = Math.min(Math.max(currentWidth, minWidth), maxWidth);
      setWidth(newWidth);
    };

    const onEnd = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      setIsResizing(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
  };

  return (
    <div className={`${className} relative flex flex-col`} style={{ width: `${width}px` }}>
      {children}
      <div className="absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize" onMouseDown={startResizing} style={{ right: 0 }} />
    </div>
  );
};

ResizableBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  activateBoxShadow: PropTypes.bool,
};

export default ResizableBox;
