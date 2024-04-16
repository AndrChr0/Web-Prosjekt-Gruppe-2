// this component is used to create a button that performs an action when clicked.

import "./ActionButton.css";

function ActionButton({ btnType, btnValue, onClick }) {
  // Provide a default no-operation function (noop) if onClick isn't passed
  const handleClick = onClick || (() => {});
  
  return (
    <button className="action-btn" type={btnType} onClick={handleClick}>{btnValue}</button>
  );
}

export default ActionButton;