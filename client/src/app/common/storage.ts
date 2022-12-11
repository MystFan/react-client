export const setItemToStorage = (key: string, itemToStore: any = {}) => {
    localStorage.setItem(key, JSON.stringify(itemToStore));
}

export const getItemFromStorage = (key: string): any => {
    const item = localStorage.getItem(key) ?? JSON.stringify({});
    return JSON.parse(item);
}

export const deleteItemFromStorage = (key: string): any => {
    localStorage.removeItem(key);
}
