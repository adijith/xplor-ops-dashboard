// Import custom SVG icons
import DashboardIcon from '../../assets/icons/dashboard.svg';
import EmployeesIcon from '../../assets/icons/employees.svg';
import PaperRollIcon from '../../assets/icons/paper_roll.svg';
import BusOwnersIcon from '../../assets/icons/bus_owners.svg';
import UserIcon from '../../assets/icons/user.svg';
import XplorLogo from '../../assets/logos/xplor_logo.svg';

const Sidebar = () => {
  const menuItems = [
    // { icon: DashboardIcon, label: 'Dashboard', active: false },
    // { icon: EmployeesIcon, label: 'Employees', active: false },
    { icon: PaperRollIcon, label: 'Paper Roll', active: true },
    // { icon: BusOwnersIcon, label: 'Bus Owners', active: false },
    // { icon: InventoryIcon, label: 'Inventory', active: false },
  ];

  return (
    <div className="w-[17%] bg-custom-sidebar text-white flex flex-col font-inter">
      {/* Admin Login Section */}
      <div className="pt-6 px-4 pb-4">
        <div className="flex items-center space-x-3">
          <img src={UserIcon} alt="User" className="w-10 h-10" />
          <span className="font-medium text-lg">Admin Login</span>
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

      {/* Operations Dashboard Logo */}
      <div className="pl-8 pr-8 py-4 pb-6">
        <div className="flex items-center space-x-4 w-full">
          <img src={XplorLogo} alt="Xplor Logo" className="w-16 h-16 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-normal text-lg">Operations</div>
            <div className="font-normal text-lg">Dashboard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;