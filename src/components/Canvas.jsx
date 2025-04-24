import React, {useRef, useCallback} from "react";
import { generateId } from "../utils/generateID";
import { getDefaultProps, ELEMENT_TYPES } from "../utils/getDefaultProps";

function CanvasElement({ id, type, props, isSelected, onSelect, position }) {
    const style = {
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        border: isSelected ? '2px dashed #3b82f6' : '1px solid transparent', // Highlight selected element
        padding: '5px',
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '4px',
        minWidth: '50px',
        minHeight: '30px',
    };

    const handleClick = (e) => {
        e.stopPropagation();
        onSelect(id);
    };

    let content;
    switch (type) {
        case ELEMENT_TYPES.TEXT:
            content = <p className="m-0 p-1 text-sm">{props.content}</p>;
            break;
        case ELEMENT_TYPES.IMAGE:
            content = <img src={props.src} alt={props.alt} className="max-w-full h-auto block rounded" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x50/fecaca/991b1b?text=Error'; }} />;
            break;
        case ELEMENT_TYPES.BUTTON:
            content = <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">{props.label}</button>;
            break;
        default:
            content = null;
    }

    return (
        <div style={style} onClick={handleClick}>
            {content}
        </div>
    );
}

export default function Canvas({ elements, setElements, selectedElementId, setSelectedElementId }) {
  const dropRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    console.log("Dragging over canvas...");
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    console.log("Drop event triggered on canvas.");

    const type = e.dataTransfer.getData('application/react-flow');
    console.log(`Dropped element type: ${type}`);

    if (!dropRef.current || !type) {
        console.error("Drop failed: Invalid drop target or missing type.");
        return;
    }

    const reactFlowBounds = dropRef.current.getBoundingClientRect();
   
    const position = {
        x: e.clientX - reactFlowBounds.left,
        y: e.clientY - reactFlowBounds.top,
    };
    console.log(`Calculated position: x=${position.x}, y=${position.y}`);


    const newElement = {
      id: generateId(),
      type,
      props: getDefaultProps(type),
      position: position,
    };

    console.log("Creating new element:", newElement);
    setElements((els) => [...els, newElement]);
    setSelectedElementId(newElement.id);

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
      className="flex-grow bg-white border border-gray-300 rounded-lg shadow-inner relative m-4 h-[600px] overflow-auto"
      style={{ minHeight: '400px' }}
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
            Drop elements here
         </div>
      )}
    </div>
  );
}