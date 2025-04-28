/**
 * @file Footer.jsx
 * @description Renders the Footer area for the site
 */

import { ELEMENT_TYPES, DND_TYPES } from "../utils/getDefaultProps";

/**
 * DraggableElement - Represents a new element that can be dragged
 *                   onto the canvas.
 *
 * @param {string} type - The ELEMENT_TYPES constant for this element.
 * @param {string} label - The display label inside the draggable item.
 * @returns {JSX.Element} A draggable div ready for drop onto the canvas.
 */
function DraggableElement({ type, label }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(DND_TYPES.ELEMENT_TYPE, type);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(DND_TYPES.EXISTING_ELEMENT_ID, '');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-3 mb-3 border text-black font-bold text-lg border-gray-300 rounded-lg bg-[var(--sidebar-text)] shadow-sm cursor-grab hover:shadow-md transition-shadow duration-200 text-center"
    >
      {label}
    </div>
  );
}

/**
 * EditorSidebar - Sidebar listing available draggable elements
 *                  for the site editor.
 *
 * @component
 * @returns {JSX.Element} Sidebar panel with draggable elements.
 */
export default function EditorSidebar() {
    return (
      <div className="w-full md:w-64 bg-[var(--sidebar-primary)] p-4 border-r min-h-full overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-[var(--sidebar-text)]">Elements</h2>
        <DraggableElement type={ELEMENT_TYPES.TEXT} label="Text Block" />
        <DraggableElement type={ELEMENT_TYPES.IMAGE} label="Image" />
        <DraggableElement type={ELEMENT_TYPES.BUTTON} label="Button" />
      </div>
    );
  }