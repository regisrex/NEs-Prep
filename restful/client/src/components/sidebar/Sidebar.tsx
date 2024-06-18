import { ArrowLeftStartOnRectangleIcon, BookOpenIcon, ReceiptPercentIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-text/10  flex flex-col justify-between h-screen">
      <div>
        <ul className="space-y-2 p-4">
          <span className='text-lg font-black mb-10'>S.M</span>

          <li>
            <Link to="/dashboard" className="flex items-center space-x-2 p-2 text-text rounded-md hover:bg-gray-100">
              <UserIcon width={20} className='stroke-text' />
              <span >Students</span> 
            </Link>
          </li>
          <li>
            <Link to="/courses" className="flex items-center space-x-2 p-2 text-text rounded-md hover:bg-gray-100">
              <BookOpenIcon width={20} className='stroke-text' />
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center space-x-2 text-text p-2 rounded-md hover:bg-gray-100">
              <ReceiptPercentIcon width={20} className='stroke-text' />
              <span>Marks</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <Link to="/" className="flex items-center  text-text-red space-x-2 p-2 rounded-md hover:bg-gray-100">
          <ArrowLeftStartOnRectangleIcon width={20} className='stroke-text-red' />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
