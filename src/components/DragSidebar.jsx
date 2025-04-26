import { ELEMENT_TYPES, DND_TYPES } from "../utils/getDefaultProps";

function DraggableElement({ type, label }) {
  const handleDragStart = (e) => {
    console.log(`Dragging NEW element started for type: ${type}`);
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