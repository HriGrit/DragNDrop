import { ELEMENT_TYPES } from "../utils/getDefaultProps";

function DraggableElement({ type, label }) {
    const handleDragStart = (e) => {
      console.log(`Dragging started for type: ${type}`);
      e.dataTransfer.setData('application/react-flow', type);
      e.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        className="p-3 mb-3 border border-gray-300 rounded-lg bg-white shadow-sm cursor-grab hover:shadow-md transition-shadow duration-200 text-center"
      >
        {label}
      </div>
    );
  }

export default function EditorSidebar() {
    return (
      <div className="w-full md:w-64 bg-gray-100 p-4 border-r border-gray-200 h-full overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Elements</h2>
        <DraggableElement type={ELEMENT_TYPES.TEXT} label="Text Block" />
        <DraggableElement type={ELEMENT_TYPES.IMAGE} label="Image" />
        <DraggableElement type={ELEMENT_TYPES.BUTTON} label="Button" />
      </div>
    );
  }