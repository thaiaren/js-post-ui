export function setTextContent(parent, selector, text) {
    if (!parent) return;
    const element = parent.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}

export function lengthConten(min, max) {
    if (max.length < min) return;
    return max.slice(0, min - 3) + '...';
}
