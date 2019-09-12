

const API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/';
const API_KEY = 'BXBGY45-S9D4MN6-KBE1SJE-QYQJYZ1';


const api = (apiUrl = API_URL) => {
  const searchAPIEndpoint = `${apiUrl}search/beers?q=`;
  const beersAPIEndpoint = `${apiUrl}beers`;
  return {

    getBeers: async text => {
      try {
        const requestUrl = text ? `${searchAPIEndpoint}${text}` : beersAPIEndpoint;
        const response = await fetch(requestUrl, {
          headers: new Headers({
            'Content-type': 'application/json; utf-8',
            'X-API-KEY': API_KEY,
          })
        });
        // console.log(response);
        if (!response.ok) {
          throw new Error('Error fetching beers');
        }
        // const data = await response.json();
        const data = await response.json();
        const beers = data.beers;
        const formatData = beers.map(item => {
          if (item.beers) {
            return item.beers;
          }
          return item;
        });
        return formatData;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    getBeerDetail: async id => {
      try {
        const response = await fetch(`${beersAPIEndpoint}/${id}`);
        if (!response.ok) {
          throw new Error('Error getting a beer');
        }
        const beer = await response.json();
        return beer;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  };
};

export default api;
