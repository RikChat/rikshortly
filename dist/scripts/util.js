const getShortURL = async (url) => {
  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await response.json();
  return data;
};

module.exports = { getShortURL };
