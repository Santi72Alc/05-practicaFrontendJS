// storage.js

const KEY = 'beersSearch';
// Load or Save the search Text and Date filter
// return object =  { text, dateFilter }

const storage = window.localStorage;

export const loadSearch = () => {
  return (storage.getItem(KEY) !== null) ? 
    JSON.parse(storage.getItem(KEY)) : 
    { text:'', dateFilter:''};
};

export const saveSearch = (text, dateFilter) => {
  const dataSearch = {text, dateFilter};
  // if text & dateFilter are empties -> delete it from localStore
  if (!dataSearch.text && !dataSearch.dateFilter) storage.removeItem(KEY);
  else storage.setItem(KEY, JSON.stringify(dataSearch));
  return dataSearch;
};

