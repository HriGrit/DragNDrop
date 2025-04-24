import { ArrowDown, ArrowRight } from "lucide-react";
import React, { useState } from "react";

const SubMenuRender = ({ items }) => {
  return (
    <ul className="ml-6">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="flex items-center justify-between px-4 py-2 hover:bg-[var(--sidebar-hover)] rounded"
        >
          <div className="flex gap-2">
            <ArrowRight className="text-[var(--sidebar-text)] w-4" />
            <span className="text-[var(--sidebar-text)]">{item}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default function SidebarElements({ menuIcon, menuHeading, subItem }) {
  const [ showMenu, setShowMenu ] = useState(false);
  
  const handleToggleClick = () => {
    if ( subItem ) {
      setShowMenu((prev) => !prev);
    }
  }

  return (
    <>
      <li 
       className="flex items-center justify-between px-4 py-4 hover:bg-[var(--sidebar-hover)] rounded" 
       onClick={handleToggleClick}
      >

        <div className="flex gap-2">
          {menuIcon}         
          <span className="text-[var(--sidebar-text)]">{menuHeading}</span>
        </div>

        <div>
          { subItem && <ArrowDown className="text-[var(--sidebar-text)] w-4" />  }
        </div>

      </li>
      { showMenu && <SubMenuRender items={subItem} />  }
    </>
  );
}
