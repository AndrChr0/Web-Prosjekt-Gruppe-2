// src/pages-teacher/MyCourses/ManageStudents.jsx
import React from 'react';
import ListOfStudents from '../../components/ListOfStudents/ListOfStudents';
import AddedStudentsInCourse from '../../components/AddedStudentsInCourse/AddedStudentsInCourse';
import './Manage-students.css';
const ManageStudents = () => {


  return (
    <main>
      <h1>Manage students</h1>
      <div className='Manage-students-wrapper'>
      <ListOfStudents />
      <AddedStudentsInCourse />
      </div>
    </main>
  );
};

export default ManageStudents;
