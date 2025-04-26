import React, { useState, useCallback, useEffect } from 'react';
import Canvas from '../components/Canvas';
import { ELEMENT_TYPES } from '../utils/getDefaultProps';

function PropertiesEditor({ element, onUpdate, onDeselect }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (element) {
      setFormData({ ...element.props });
    } else {
      setFormData({});
    }
  }, [element]);

  if (!element) {
    return (
      <div className="w-full md:w-72 bg-[var(--sidebar-primary)] p-4 border-l border-gray-200 h-dvh flex-shrink-0 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-white">Properties</h2>
        <p className="text-[var(--sidebar-text)]">Select an element to edit its properties.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProps = {
            ...formData,
            src: reader.result,
            fileName: file.name,
            alt: formData.alt || file.name,
        };
        setFormData(newProps);
        onUpdate(element.id, newProps);
      };
      reader.onerror = (error) => {
          console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    } else if (file) {
        alert("Please select an image file (e.g., jpg, png, gif).");
    }
  };

  const handleBlur = (e) => {
     const { name } = e.target;
     if (element && formData[name] !== element.props[name]) {
        onUpdate(element.id, { ...formData });
     }
  };

const renderFormFields = () => {
  switch (element.type) {
    case ELEMENT_TYPES.TEXT:
      return (
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-[var(--sidebar-text)] mb-1"
          >
            Text Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="4"
            className="
              w-full p-2 
              bg-[var(--background-secondary)] 
              text-black
              rounded-md shadow-sm 
            "
          />
        </div>
      )

    case ELEMENT_TYPES.IMAGE:
      return (
        <>
          <div className="mb-3">
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-[var(--sidebar-text)] mb-1"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/*"
              onChange={handleFileChange}
              className="
                block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4 file:rounded-md 
                file:border-0 file:text-sm file:font-semibold 
                file:bg-[var(--background-secondary)] 
                file:text-black
                cursor-pointer
              "
            />
            {formData.fileName && (
              <p className="text-xs text-[var(--sidebar-text)] mt-1">
                Current: {formData.fileName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="alt"
              className="block text-sm font-medium text-[var(--sidebar-text)] mb-1"
            >
              Alt Text
            </label>
            <input
              type="text"
              id="alt"
              name="alt"
              value={formData.alt || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className="
                w-full p-2 
                bg-[var(--background-secondary)] 
                text-black
                rounded-md shadow-sm 
              "
            />
          </div>
        </>
      )

    case ELEMENT_TYPES.BUTTON:
      return (
        <div>
          <label
            htmlFor="label"
            className="block text-sm font-medium text-[var(--sidebar-text)] mb-1"
          >
            Button Label
          </label>
          <input
            type="text"
            id="label"
            name="label"
            value={formData.label || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className="
              w-full p-2 
              bg-[var(--background-secondary)] 
              text-black
              rounded-md shadow-sm 
            "
          />
        </div>
      )

    default:
      return (
        <p className="text-[var(--sidebar-text)]">
          Unknown element type.
        </p>
      )
  }
}

return (
  <div className="
      w-full md:w-72 
      bg-[var(--sidebar-primary)] 
      p-4 
      border-l border-[var(--sidebar-hover)] 
      h-dvh flex-shrink-0 overflow-y-auto
    ">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-white">
        Properties
      </h2>
      {element && (
        <button
          onClick={onDeselect}
          className="
            text-[var(--btn-red-bg)] 
            hover:text-[var(--btn-red-border)]
          "
          title="Deselect Element"
        >
          &times; Delete
        </button>
      )}
    </div>

    {element && (
      <p className="text-sm text-white mb-3">
        Editing: <span className="font-medium">{element.type}</span>
      </p>
    )}

    <form onSubmit={e => e.preventDefault()} key={element ? element.id : 'empty'}>
      {renderFormFields()}
    </form>
  </div>
)
}

export default function DragPage() {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  const updateElementProps = useCallback((id, newProps) => {
    setElements((els) =>
      els.map((el) =>
        el.id === id ? { ...el, props: { ...el.props, ...newProps } } : el
      )
    );
  }, [setElements]);

  const handleDeselect = () => {
    setElements(prev =>
      prev.filter(el => el.id !== selectedElementId)
    );
    console.log(elements);
    
    setSelectedElementId(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-[600px]">
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
