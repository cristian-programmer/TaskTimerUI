const storage = window.localStorage;

export const addLocalStorage = (key, value) => {
  storage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return storage.getItem(key);
};

export const removeItem = (key) => {
  storage.removeItem(key);
};

export const cleanLocalStorage = () => {
  storage.clear();
};
