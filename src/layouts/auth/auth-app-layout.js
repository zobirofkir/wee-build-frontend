import React from "react";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";
import DesktopSidebareComponent from "../../component/auth/desktop-sidebare-component";
import MobileSidebareComponent from "../../component/auth/mobile-sidebare-component";
import { LogoutAction } from "../../redux/action/auth/logout-action";
import { useDispatch } from "react-redux";

const AuthAppLayout = ({ children }) => {
  const navItems = [
    { icon: <FiHome className="h-5 w-5" />, label: "Dashboard", active: true },
    {
      icon: <FiShoppingBag className="h-5 w-5" />,
      label: "AI Models",
      active: false,
    },
    {
      icon: <FiUsers className="h-5 w-5" />,
      label: "Customers",
      active: false,
    },
    {
      icon: <FiBarChart2 className="h-5 w-5" />,
      label: "Analytics",
      active: false,
    },
    {
      icon: <FiSettings className="h-5 w-5" />,
      label: "Settings",
      active: false,
    },
  ];

  const dispatch = useDispatch();
  
  const logout = () => {
    dispatch(LogoutAction());
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <DesktopSidebareComponent navItems={navItems} logout={logout}/>

      {/* Mobile Sidebar */}
      <MobileSidebareComponent navItems={navItems} logout={logout}/>


      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default AuthAppLayout;
