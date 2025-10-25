import React from "react";
import { Home, User, Settings, Mail, FileText, LogOut } from "lucide-react";

const SideBar = () => {
  const navigationItems = [
    { href: "/Home", icon: Home, label: "Dashboard" },
    { href: "/Home/messages", icon: Mail, label: "Messages" },
    { href: "/Home/settings", icon: Settings, label: "Settings" },
    { href: "/Home/Complain", icon: FileText, label: "Complaint Form" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col -ml-5 -mt-5 -mb-6 sticky text-sm">
      <div className="p-4 border-b border-gray-700">
        <a
          href="/"
          className="text-xl font-bold hover:text-blue-400 transition-colors"
        >
          MyApp
        </a>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 mr-3 group-hover:text-blue-400 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer/Logout */}
      <div className="p-4 border-t border-gray-700">
        <a
          href="/logout"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-red-600 hover:text-white rounded transition-all duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
