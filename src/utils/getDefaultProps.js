export const ELEMENT_TYPES = {
    TEXT: 'text',
    IMAGE: 'image',
    BUTTON: 'button',
};

export const DND_TYPES = {
    ELEMENT_TYPE: 'application/react-flow-element-type',
    EXISTING_ELEMENT_ID: 'application/react-flow-element-id',
    DRAG_OFFSET_X: 'application/react-flow-offset-x',
    DRAG_OFFSET_Y: 'application/react-flow-offset-y',
};

export const getDefaultProps = (type) => {
    switch (type) {
        case ELEMENT_TYPES.TEXT:
            return { content: 'New Text Block' };
        case ELEMENT_TYPES.IMAGE:
            return { src: 'https://placehold.co/150x100/e2e8f0/cbd5e1?text=Image', alt: 'Placeholder Image' };
        case ELEMENT_TYPES.BUTTON:
            return { label: 'Click Me', action: '#' };
        default:
            return {};
    }
};