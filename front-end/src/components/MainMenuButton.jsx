import { Link } from "react-router-dom";

function MainMenuButton(props) {
  const path = props.path;
  const buttonName = props.buttonName;
  return (
    <div>
      <Link className="main-menu-btn" to={path}>{buttonName}</Link>
    </div>
  );
}

export default MainMenuButton;
