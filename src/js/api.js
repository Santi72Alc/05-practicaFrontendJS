// api.js
export const API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/';
const API_KEY = 'BXBGY45-S9D4MN6-KBE1SJE-QYQJYZ1';
import { renderLoader } from './ui.js';


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
        const data = await response.json();
        const beers = data.beers;
        // Take all beers in the DB and convert to array
        let formatData = beers.map(item => {
          if (item.beers) {
            return item.beers;
          }
          return item;
        });

        // control the date
        let searchMonth, searchYear;
        if (searchDate) {
          const date = new Date(searchDate);    // Date by User
          // we keep only the month and year
          searchMonth = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
          searchYear = date.getFullYear();
          formatData = formatData.filter( item => {
            const [itemMonth, itemYear] = (item.firstBrewed).split('/');
            // if the item has the same date (month && Year) is taken
            return (itemMonth == searchMonth && itemYear == searchYear);
          });
        };       
        return formatData;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    getBeerDetail: async id => {
      try {
        renderLoader('hide', 'show');
        const response = await fetch(`${beersAPIEndpoint}${id}`, apiOptionsGet);
        if (!response.ok) {
          throw new Error('Error getting a beer');
        }
        const data = await response.json();
        const beer = data.beer;
        renderLoader('show', 'hide');
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
            // // take the 19th first chars
            // dateComment: (new Date()).toJSON().slice(0,19)
          }),
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error('Creating quote');
        }
        return await response.json();
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  };
};

export default api;
