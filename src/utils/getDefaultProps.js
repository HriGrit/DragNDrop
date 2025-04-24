export const ELEMENT_TYPES = {
    TEXT: 'text',
    IMAGE: 'image',
    BUTTON: 'button',
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