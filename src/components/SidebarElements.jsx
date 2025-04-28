/**
 * @file SidebarElements.jsx
 * @description Renders individual sidebar menu items, including optional submenus
 *              for nested navigation links in the editor sidebar.
 */
import { ArrowDown, ArrowRight } from "lucide-react";
import React, { useState } from "react";

/**
 * SubMenuRender - Renders a list of submenu items with an arrow icon.
 *
 * @param {string[]} items - Array of submenu label strings to display.
 * @returns {JSX.Element} An unordered list of submenu entries.
 */
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

/**
 * SidebarElements - Represents a clickable sidebar entry that may toggle a submenu.
 *
 * @param {React.ReactNode} menuIcon - Icon to display alongside the menu heading.
 * @param {string} menuHeading - Text label for this menu entry.
 * @param {string[]} [subItem] - Optional array of submenu labels. If provided,
 *                               enables toggling of the nested sublist.
 * @returns {JSX.Element} A list item with optional dropdown behavior.
 */
export default function SidebarElements({ menuIcon, menuHeading, subItem }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleClick = () => {
    if (subItem) setShowMenu((prev) => !prev);
  };

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
          {subItem && <ArrowDown className="text-[var(--sidebar-text)] w-4" />}
        </div>
      </li>
      {showMenu && <SubMenuRender items={subItem} />}
    </>
  );
}