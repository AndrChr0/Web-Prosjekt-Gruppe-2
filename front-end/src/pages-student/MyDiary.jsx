import DiaryReflections from "../components/DiaryReflections/DiaryReflections";
import MainMenuButton from "../components/MainmenuButton/MainMenuButton";
function MyDiary() {
  return (

    <>
      <h1>My diary</h1>
      <main>
      <h1>My diary | Student</h1>
      <div className="main-btn-container">
        <MainMenuButton
          path="/new_reflection"
          buttonName="New Reflection"
        ></MainMenuButton>
        {/* <MainMenuButton
          path="/add_course"
          buttonName="Add Course"
        ></MainMenuButton> */}
      </div>

    <DiaryReflections></DiaryReflections>

      </main>
    </>
  );
}

export default MyDiary;
