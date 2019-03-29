const DEFAULT_TIMEOUT = 200;

export const formatDateFromString = date => {
  const d = new Date(date);
  const month = d.toLocaleString('en', { month: 'long' });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};
export const dateToYear = date => new Date(date).getFullYear();

export const imagePathToSrc = imagePath => `https://image.tmdb.org/t/p/w500/${imagePath}`;

export const debounce = (action, debounceTimeOut = DEFAULT_TIMEOUT) => {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      action(...args);
    }, debounceTimeOut);
  };
};
