import { Link } from 'react-router-dom';
import { CalendarHeart, UsersRound, Activity } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white shadow border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between py-4 sm:h-16 sm:py-0 items-center gap-4 sm:gap-0">
          <Link to="/" className="flex items-center space-x-2 shrink-0 group">
            <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-700 transition duration-300">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              OroGlee Dental
            </span>
          </Link>
          
          <nav className="flex space-x-6 sm:space-x-8">
            <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-300">
              <UsersRound className="w-4 h-4 mr-2" /> Dentists
            </Link>
            <Link to="/admin" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-300">
              <CalendarHeart className="w-4 h-4 mr-2" /> Admin Panel
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
