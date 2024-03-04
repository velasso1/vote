import React, { useState } from "react";

const Tooltip = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const hideTooltip = () => {
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
  };

  return (
    <div className="tooltip" onMouseEnter={() => hideTooltip()}>
      <img src="images/information.png" alt="info" />
      {showTooltip && <div className="tooltip__context">{text}</div>}
    </div>
  );
};

export default Tooltip;
