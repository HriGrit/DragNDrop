/**
 * @file Canvas.js
 * @description Renders the drag-and-drop canvas area and its child elements.
 *              Manages new element drops, movement of existing elements, and selection state.
 */
import React, { useRef, useCallback } from "react";
import { generateId } from "../utils/generateID";
import { getDefaultProps, ELEMENT_TYPES, DND_TYPES } from "../utils/getDefaultProps";

/**
 * CanvasElement - Represents and renders an individual element on the canvas.
 *                  Supports selection, dragging, and display based on type.
 *
 * @param {string} id             - Unique identifier for the element.
 * @param {string} type           - One of ELEMENT_TYPES defining the element kind.
 * @param {Object} props          - Properties for rendering (content, src, label, etc.).
 * @param {boolean} isSelected    - Whether this element is currently selected.
 * @param {Function} onSelect     - Callback to call when the element is clicked to select.
 * @param {{x: number, y: number}} position - Pixel coordinates for element placement.
 * @returns {JSX.Element} The rendered canvas element.
 */
function CanvasElement({ id, type, props, isSelected, onSelect, position }) {
  const elementRef = useRef(null);

  const style = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    border: isSelected ? '2px dashed #3b82f6' : '1px solid transparent',
    padding: '5px',
    cursor: isSelected ? 'move' : 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '4px',
    minWidth: '50px',
    minHeight: '30px',
    userSelect: 'none',
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handleDragStart = (e) => {
    if (!isSelected) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    console.log(`Dragging EXISTING element started: ${id}`);

    const rect = elementRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    e.dataTransfer.setData(DND_TYPES.EXISTING_ELEMENT_ID, id);
    e.dataTransfer.setData(DND_TYPES.DRAG_OFFSET_X, offsetX.toString());
    e.dataTransfer.setData(DND_TYPES.DRAG_OFFSET_Y, offsetY.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    if (elementRef.current) {
      elementRef.current.style.opacity = '1';
    }
  };

  let content;
  switch (type) {
    case ELEMENT_TYPES.TEXT:
      content = <p className="m-0 p-1 text-sm break-words">{props.content}</p>;
      break;
    case ELEMENT_TYPES.IMAGE:
      content = (
        <img
          src={props.src}
          alt={props.alt}
          width="150px"
          height="90px"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x50/fecaca/991b1b?text=Error'; }}
        />
      );
      break;
    case ELEMENT_TYPES.BUTTON:
      content = (
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm pointer-events-none">
          {props.label}
        </button>
      );
      break;
    default:
      content = null;
  }

  return (
    <div
      ref={elementRef}
      style={style}
      onClick={handleClick}
      draggable={isSelected}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {content}
    </div>
  );
}

/**
 * Canvas - Main canvas container handling drop events for adding or moving elements.
 *
 * @param {Object[]} elements                - Array of elements currently on the canvas.
 * @param {Function} setElements             - State setter to update elements array.
 * @param {string|null} selectedElementId    - ID of the currently selected element, or null.
 * @param {Function} setSelectedElementId    - State setter for selected element.
 * @returns {JSX.Element} The interactive canvas area.
 */
export default function Canvas({ elements, setElements, selectedElementId, setSelectedElementId }) {
  const dropRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    console.log("Drop event triggered on canvas.");

    const existingElementId = e.dataTransfer.getData(DND_TYPES.EXISTING_ELEMENT_ID);
    const elementType = e.dataTransfer.getData(DND_TYPES.ELEMENT_TYPE);

    if (!dropRef.current) {
      console.error("Drop failed: Invalid drop target.");
      return;
    }
    const canvasBounds = dropRef.current.getBoundingClientRect();
    const dropX = e.clientX - canvasBounds.left;
    const dropY = e.clientY - canvasBounds.top;

    if (existingElementId) {
      const offsetX = parseFloat(e.dataTransfer.getData(DND_TYPES.DRAG_OFFSET_X) || '0');
      const offsetY = parseFloat(e.dataTransfer.getData(DND_TYPES.DRAG_OFFSET_Y) || '0');
      const newX = dropX - offsetX;
      const newY = dropY - offsetY;

      setElements((els) =>
        els.map((el) =>
          el.id === existingElementId ? { ...el, position: { x: newX, y: newY } } : el
        )
      );
      setSelectedElementId(existingElementId);
    } else if (elementType) {
      const newElement = {
        id: generateId(),
        type: elementType,
        props: getDefaultProps(elementType),
        position: { x: dropX, y: dropY },
      };
      setElements((els) => [...els, newElement]);
      setSelectedElementId(newElement.id);
    } else {
      console.warn("Drop event occurred with no valid element type or ID.");
    }
  }, [setElements, setSelectedElementId]);

  const handleCanvasClick = () => {
    setSelectedElementId(null);
  };

  return (
    <div
      ref={dropRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
      className="flex-grow bg-gray-50 border border-gray-300 rounded-lg shadow-inner relative overflow-auto min-h-[400px]"
    >
      <div className="absolute inset-0">
        {elements.map((el) => (
          <CanvasElement
            key={el.id}
            id={el.id}
            type={el.type}
            props={el.props}
            position={el.position}
            isSelected={el.id === selectedElementId}
            onSelect={setSelectedElementId}
          />
        ))}
      </div>
      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg pointer-events-none">
          Drag and Drop elements here
        </div>
      )}
    </div>
  );
}
