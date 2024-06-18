import React from 'react';

interface CourseCardProps {
  title: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title }) => {
  return (
    <div className="bg-blue-500 text-white font-bold p-9 rounded-lg transform transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg hover:scale-105">
      {title}
    </div>
  );
};

export default CourseCard;
