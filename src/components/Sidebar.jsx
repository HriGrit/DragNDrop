// Sidebar.jsx
import { BriefcaseBusiness, IdCard, LayoutDashboard, LucideMessageCircleQuestion, Menu, Search, StoreIcon, Trash2Icon } from "lucide-react";
import SidebarElements from "./SidebarElements";

const menuItems = [
  {
    icon: <LayoutDashboard className="text-[var(--sidebar-text)]" />,
    heading: "Dashboard",
  },
  {
    icon: <BriefcaseBusiness className="text-[var(--sidebar-text)]" />,
    heading: "Business",
  },
  {
    icon: <IdCard className="text-[var(--sidebar-text)]" />,
    heading: "Business Card",
  },
  {
    icon: <StoreIcon className="text-[var(--sidebar-text)]" />,
    heading: "Store",
    subItem: [
      'Categories',
      'Products/Services',
      'Attributes',
      'Shipping Rules'
    ]
  },
  {
    icon: <Menu className="text-[var(--sidebar-text)]" />,
    heading: "Customizable Menu"
  },
  {
    icon: <LayoutDashboard className="text-[var(--sidebar-text)]" />,
    heading: "Dashboard",
  },
  {
    icon: <BriefcaseBusiness className="text-[var(--sidebar-text)]" />,
    heading: "Business",
  },
  {
    icon: <IdCard className="text-[var(--sidebar-text)]" />,
    heading: "Business Card",
  },
  {
    icon: <StoreIcon className="text-[var(--sidebar-text)]" />,
    heading: "Store",
    subItem: [
      'Categories',
      'Products/Services',
      'Attributes',
      'Shipping Rules'
    ]
  },
  {
    icon: <Menu className="text-[var(--sidebar-text)]" />,
    heading: "Customizable Menu"
  },
  {
    icon: <LucideMessageCircleQuestion className="text-[var(--sidebar-text)]" />,
    heading: 'FAQ'
  },
  {
    icon: <Trash2Icon className="text-[var(--sidebar-text)]" />,
    heading: 'Delete'
  }
];

export default function Sidebar() {
  return (
    <div className="w-full md:w-64 bg-[var(--sidebar-primary)] p-4 border-r border-gray-200">
      <div className="flex gap-4 px-4 mb-4">
        <Search className="text-[var(--sidebar-text)] w-full" />
        <input type="text" className="bg-white w-fit border-black  border-1 rounded-md p-[1px]" placeholder="Search.." />
      </div>
      <ul>
        {menuItems.map((item, idx) => (
          <SidebarElements
            key={idx}
            menuIcon={item.icon}
            menuHeading={item.heading}
            subItem={item.subItem}
          />
        ))}
      </ul>
    </div>
  );
}
