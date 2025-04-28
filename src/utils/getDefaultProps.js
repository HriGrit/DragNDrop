/**
 * @file getDefaultProps.js
 * @description Defines the supported element types, drag-and-drop data transfer constants,
 *              and a utility to generate default properties for new elements.
 */

/**
 * ELEMENT_TYPES - Supported types of elements available in the editor.
 * @readonly
 * @enum {string}
 */
export const ELEMENT_TYPES = {
    TEXT: 'text',
    IMAGE: 'image',
    BUTTON: 'button',
};

/**
 * DND_TYPES - Data transfer types used during drag-and-drop operations.
 * @readonly
 * @enum {string}
 */
export const DND_TYPES = {
    ELEMENT_TYPE: 'application/react-flow-element-type',
    EXISTING_ELEMENT_ID: 'application/react-flow-element-id',
    DRAG_OFFSET_X: 'application/react-flow-offset-x',
    DRAG_OFFSET_Y: 'application/react-flow-offset-y',
};

/**
 * getDefaultProps - Returns the default set of properties for a new element of the specified type.
 *
 * @param {string} type - One of ELEMENT_TYPES.TEXT, IMAGE, or BUTTON.
 * @returns {Object} A mapping of default properties for the element.
 */
export const getDefaultProps = (type) => {
    switch (type) {
        case ELEMENT_TYPES.TEXT:
            return { content: 'New Text Block' };
        case ELEMENT_TYPES.IMAGE:
            return {
                src: 'https://placehold.co/150x100/e2e8f0/cbd5e1?text=Image',
                alt: 'Placeholder Image',
            };
        case ELEMENT_TYPES.BUTTON:
            return { label: 'Click Me', action: '#' };
        default:
            return {};
    }
};
