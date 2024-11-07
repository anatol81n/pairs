export const createTag = (tagName = "div", classes = [], args = {}) => {
    if (typeof tagName !== "string" || tagName.length === 0) {
        tagName = "div";
    }
    const tag = document.createElement(tagName);
    if (typeof classes === "object" && Array.isArray(classes) && classes.length > 0) {
        tag.classList.add(...classes);
    }
    for (let argName in args) {
        tag[argName] = args[argName];
    }
    return tag;
};

export const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
