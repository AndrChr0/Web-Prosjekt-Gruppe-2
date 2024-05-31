import TeacherCourseInfo from "../../components/CourseInfo/Teacher_CourseInfo";
import ReflectionActivites from "../../components/ReflectionActivites/Teacher_ReflectionActivites";
import { Link } from "react-router-dom";

const TeacherCourse = () => {
  return (
    <div>
      <TeacherCourseInfo></TeacherCourseInfo>
      <main>
        <div className="Activities-List">
          <ReflectionActivites />
        </div>
      </main>
    </div>
  );
};

export default TeacherCourse;
