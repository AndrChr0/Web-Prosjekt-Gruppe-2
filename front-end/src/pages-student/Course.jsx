import CourseInfo from "../components/CourseInfo/CourseInfo";
import ReflectionActivites from "../components/ReflectionActivites/ReflectionActivites-list";


const Course = () => {
    return (
        <div>
        <CourseInfo />
        <main>
            <div className="Activities-List">
                <ReflectionActivites />
            </div>
        </main>
        </div>
    );
}

export default Course;