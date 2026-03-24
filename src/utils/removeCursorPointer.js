// Utility function to remove all cursor types from elements
export const removeCursorPointer = () => {
    // Remove cursor-pointer class from all elements
    const elementsWithCursor = document.querySelectorAll('.cursor-pointer');
    elementsWithCursor.forEach(element => {
        element.classList.remove('cursor-pointer');
        element.style.cursor = 'default';
    });

    // Remove cursor from ALL elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.style.cursor = 'default';
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.mozUserSelect = 'none';
        element.style.msUserSelect = 'none';
    });

    // Remove cursor from text inputs specifically
    const textInputs = document.querySelectorAll('input, textarea');
    textInputs.forEach(input => {
        input.style.cursor = 'default';
        input.style.userSelect = 'none';
    });

    // Remove cursor from text elements
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, label, li, td, th');
    textElements.forEach(element => {
        element.style.cursor = 'default';
        element.style.userSelect = 'none';
    });
};

// Function to apply no-cursor styles to new elements
export const applyNoCursorStyles = (element) => {
    if (element) {
        element.style.cursor = 'default';
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.mozUserSelect = 'none';
        element.style.msUserSelect = 'none';
        element.classList.remove('cursor-pointer');
    }
};

// Observer to watch for new elements and remove cursor pointer
export const initCursorObserver = () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Remove cursor pointer from the new element
                    applyNoCursorStyles(node);
                    
                    // Remove cursor pointer from child elements
                    const childElements = node.querySelectorAll ? 
                        node.querySelectorAll('button, a, [onclick], [role="button"], .cursor-pointer') : [];
                    childElements.forEach(applyNoCursorStyles);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return observer;
};
