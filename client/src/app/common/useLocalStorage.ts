import { useEffect, useState } from "react";

const useLocalStorage = (key: string, defaultItem: any) => {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key) ?? JSON.stringify(defaultItem);
        return JSON.parse(item);
    });

    useEffect(() => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [value]);

    return [value, setValue];
}

export default useLocalStorage;
