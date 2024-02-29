import MainMenuButton from "../components/MainmenuButton/MainMenuButton";
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
        <MainMenuButton
          path="/add_course"
          buttonName="Add Course"
        ></MainMenuButton>
      </div>
      </main>
    </>
  );
}

export default MyDiary;
