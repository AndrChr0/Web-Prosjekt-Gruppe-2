
/**Description: This component is a simple button that can be used to trigger an action. 
It takes in three props: btnType, btnValue, and onClick. 
The btnType prop is the type of button (e.g. "submit", "button", etc.),
the btnValue prop is the text that will be displayed on the button, and the onClick 
prop is the function that will be called when the button is clicked. 
If the onClick prop is not passed, the button will have a no-operation function (noop) as its onClick handler.**/


import "./ActionButton.css";

function ActionButton({ btnType, btnValue, onClick }) {
  // Provide a default no-operation function (noop) if onClick isn't passed
  const handleClick = onClick || (() => {});
  
  return (
    <button className="action-btn" type={btnType} onClick={handleClick}>{btnValue}</button>
  );
}

export default ActionButton;