import TeacherCourseInfo from "../../components/CourseInfo/Teacher_CourseInfo";
import ReflectionActivites from "../../components/ReflectionActivites/Teacher_ReflectionActivites";


const TeacherCourse = () => {
    return (
        <div>
        <TeacherCourseInfo />
        <main>

            <div className="Activities-List">
                <ReflectionActivites />
            </div>
        </main>
        </div>
    );
}

export default TeacherCourse;