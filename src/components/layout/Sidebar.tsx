// Import custom SVG icons
import DashboardIcon from '../../assets/icons/dashboard.svg';
import EmployeesIcon from '../../assets/icons/employees.svg';
import PaperRollIcon from '../../assets/icons/paper_roll.svg';
import BusOwnersIcon from '../../assets/icons/bus_owners.svg';
import XplorLogo from '../../assets/logos/xplor_logo.svg';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { logout, userDetails } = useAuth();
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const menuItems = [
    // { icon: DashboardIcon, label: 'Dashboard', active: false },
    // { icon: EmployeesIcon, label: 'Employees', active: false },
    { icon: PaperRollIcon, label: 'Paper Roll', active: true },
    // { icon: BusOwnersIcon, label: 'Bus Owners', active: false },
    // { icon: InventoryIcon, label: 'Inventory', active: false },
  ];

  return (
    <div className="w-[17%] bg-custom-sidebar text-white flex flex-col font-inter">
      {/* Operations Dashboard Header */}
      <div className="pt-6 px-4 pb-4">
        <div className="flex items-center space-x-3">
          <img src={XplorLogo} alt="Xplor Logo" className="w-10 h-10" />
          <div>
            <div className="font-medium text-lg">Operations</div>
            <div className="font-medium text-lg">Dashboard</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
              item.active 
                ? 'bg-custom-selected text-white mx-0' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg mx-2'
            }`}
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="pl-1 pr-4 py-2 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-3 px-6 py-4 text-base font-medium text-white hover:text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
          style={{ transform: 'scale(1.10)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;