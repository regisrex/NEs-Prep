import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-end p-4 bg-white  border-b border-text/20 mb-6">
      <div className="flex items-center">
        <span className="mr-4 text-text">{      localStorage.getItem("fullNames")}</span>
        <UserCircleIcon width={26} className=" text-text stroke-text" />
      </div>
    </nav>
  );
}
