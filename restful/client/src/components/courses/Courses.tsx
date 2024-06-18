import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import CourseCard from './CourseCard'; // Make sure to import CourseCard from the correct path

const courses = [
  "Project Management", "Advanced Embedded Systems", "Software Engineering II", 
  "Applied Mathematics III", "English III", "Devops", "Applied Physics III", 
  "Network Security"
];

const Courses: React.FC = () => {
  return (
    <div className="flex h-screen font-poppins">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Your Courses</h1>
          
          <div>
            <h3 className="text-xl mb-2">First Term</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {courses.slice(0, 8).map((course, index) => (
                <CourseCard key={index} title={course} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Courses;
