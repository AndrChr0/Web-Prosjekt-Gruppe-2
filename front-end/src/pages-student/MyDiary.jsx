import DiaryReflections from "../components/DiaryReflections/DiaryReflections";
import MainMenuButton from "../components/MainmenuButton/MainMenuButton";
import "./MyDiary.css";

function MyDiary() {
  return (
    <>
      <h1>My diary</h1>
      <main>
        <div className="main-btn-container">
          <MainMenuButton
            path="/new_reflection"
            buttonName="New Reflection"
          ></MainMenuButton>
        </div>

        <DiaryReflections></DiaryReflections>
      </main>
    </>
  );
}

export default MyDiary;
