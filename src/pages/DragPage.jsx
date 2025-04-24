import React, { useState, useCallback } from 'react';
import Canvas from '../components/Canvas';
import { ELEMENT_TYPES } from '../utils/getDefaultProps';

function PropertiesEditor({ element, onUpdate, onDeselect }) {
  const [formData, setFormData] = useState(element ? { ...element.props } : {});

  React.useEffect(() => {
    if (element) {
      setFormData({ ...element.props });
    }
  }, [element]);

  if (!element) {
    return (
      <div className="w-full md:w-72 bg-gray-100 p-4 border-l border-gray-200 h-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Properties</h2>
        <p className="text-gray-500">Select an element to edit its properties.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
     const { name } = e.target;
     if (formData[name] !== element.props[name]) {
        onUpdate(element.id, { ...formData });
     }
  };

   const handleImageUrlBlur = () => {
     if (formData.src !== element.props.src) {
        onUpdate(element.id, { ...formData });
     }
   };


  const renderFormFields = () => {
    switch (element.type) {
      case ELEMENT_TYPES.TEXT:
        return (
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case ELEMENT_TYPES.IMAGE:
        return (
          <>
            <div>
              <label htmlFor="src" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                id="src"
                name="src"
                value={formData.src || ''}
                onChange={handleChange}
                onBlur={handleImageUrlBlur}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="alt" className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
              <input
                type="text"
                id="alt"
                name="alt"
                value={formData.alt || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        );
      case ELEMENT_TYPES.BUTTON:
        return (
          <>
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
              <input
                type="text"
                id="label"
                name="label"
                value={formData.label || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* In a real app, action would be more complex (e.g., link, trigger event) */}
            {/* <div className="mt-3">
              <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">Action (URL)</label>
              <input
                type="text"
                id="action"
                name="action"
                value={formData.action || '#'}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div> */}
          </>
        );
      default:
        return <p className="text-gray-500">Unknown element type.</p>;
    }
  };

  return (
    <div className="w-full md:w-72 bg-gray-100 p-4 border-l border-gray-200 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Properties</h2>
        <button onClick={onDeselect} className="text-sm text-blue-600 hover:text-blue-800">&times; Deselect</button>
      </div>
      <p className="text-sm text-gray-500 mb-3">Editing: <span className="font-medium">{element.type}</span></p>
      <form onSubmit={(e) => e.preventDefault()}>
         {renderFormFields()}
      </form>
    </div>
  );
}

export default function DragPage() {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
 
  const selectedElement = elements.find((el) => el.id === selectedElementId);

  const updateElementProps = useCallback((id, newProps) => {
    setElements((els) =>
      els.map((el) =>
        el.id === id ? { ...el, props: newProps } : el
      )
    );
  }, [setElements]);

  const handleDeselect = () => {
    setSelectedElementId(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-50">
      <Canvas
        elements={elements}
        setElements={setElements}
        selectedElementId={selectedElementId}
        setSelectedElementId={setSelectedElementId}
      />

      <PropertiesEditor
        element={selectedElement}
        onUpdate={updateElementProps}
        onDeselect={handleDeselect}
      />
    </div>
  );
}
