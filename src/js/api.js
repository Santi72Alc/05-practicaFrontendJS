// api.js
export const API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/';
const API_KEY = 'BXBGY45-S9D4MN6-KBE1SJE-QYQJYZ1';

// API beer - Get options
const apiOptionsGet = {
  headers: new Headers({
    'Content-type': 'application/json; utf-8',
    'X-API-KEY': API_KEY,
  })
};


const api = (apiUrl = API_URL) => {
  const searchAPIEndpoint = `${apiUrl}beers?search=`;
  const beersAPIEndpoint = `${apiUrl}beers/`;
  return {

    getBeers: async (searchText, searchDate)  => {
      try {
        const requestUrl = searchText ? `${searchAPIEndpoint}${searchText}` : beersAPIEndpoint;
        const response = await fetch(requestUrl, apiOptionsGet);
        // console.log(response);
        if (!response.ok) {
          throw new Error('Error fetching beers');
        }
        let byDate = false;
        const data = await response.json();
        const beers = data.beers;
        let searchMonth, searchYear;
        if (searchDate) {
          byDate = true;
          const date = new Date(searchDate);    // Date by User
          // we keep only the month and year
          searchMonth = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
          searchYear = date.getFullYear();
        };
        let formatData = beers.map(item => {
          if (item.beers) {
            return item.beers;
          }
          return item;
        });
        console.log(formatData);
        if (byDate){
          formatData = formatData.filter( item => {
            const [itemMonth, itemYear] = (item.firstBrewed).split('/');
            // if the item has the same date (month && Year) is taken
            return (itemMonth == searchMonth && itemYear == searchYear);
          });
        };
        console.log(formatData);
        return formatData;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    getBeerDetail: async id => {
      try {
        const response = await fetch(`${beersAPIEndpoint}${id}`, apiOptionsGet);
        if (!response.ok) {
          throw new Error('Error getting a beer');
        }
        const data = await response.json();
        const beer = data.beer;
        return beer;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    getQuotes: async id => {
      try {
        const response = await fetch(`${beersAPIEndpoint}${id}`, apiOptionsGet);
        if (!response.ok) {
          throw new Error('Error fetching quotes');
        }
        const data = await response.json();
        if (data.beer.comment == undefined) return [];
        const comments = data.beer.comment;
        return comments;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    
    createQuote: async (id, text) => {
      try {
        if (!text) return;    // No empty comments
        const response = await fetch(`${beersAPIEndpoint}${id}/comment`, {
          method: 'POST',
          body: JSON.stringify({ 
            comment: text, 
          }),
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error('Creating quote');
        }
        const responseBody = await response.json();
        return responseBody;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  };
};

export default api;
