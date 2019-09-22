// api.js
export const API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/';
const API_KEY = 'BXBGY45-S9D4MN6-KBE1SJE-QYQJYZ1';

import { renderLoader } from './ui.js';
import { showError } from './errors.js';


// API beer - Get options
const axiosGetOptions = {
  method: 'get',
  headers: {
    'Content-type': 'application/json; utf-8',
    'X-API-KEY': API_KEY,
  },
};
// const apiOptionsPost - method 'POST'  --> declarated in createQuote


const api = (apiUrl = API_URL) => {
  const searchAPIEndpoint = `${apiUrl}beers?search=`;
  const beersAPIEndpoint = `${apiUrl}beers/`;
  return {

    getBeers: async (searchText, searchDate)  => {
      try {
        const requestUrl = searchText ? `${searchAPIEndpoint}${searchText}` : beersAPIEndpoint;
        // const response = await fetch(requestUrl, apiOptionsGet);
        let formatData = [];
        axiosGetOptions.url = requestUrl;
        const response = await axios(axiosGetOptions);
        if (response.data.success) {
          const beers = response.data.beers;
          // Take all beers in the DB and convert to array
          formatData = beers.map(item => {
            if (item.beers) {
              return item.beers;
            }
            return item;
          });

          // there are filter by date
          if (searchDate) {
            const date = new Date(searchDate);
            // we keep only the month and year
            const searchMonth = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
            const searchYear = date.getFullYear();
            formatData = formatData.filter( item => {
              const [itemMonth, itemYear] = (item.firstBrewed).split('/');
              // if the item has the same date (month && Year) is taken
              return (itemMonth == searchMonth && itemYear == searchYear);
            });
          };
        } else formatData = [];
        return formatData;
      } catch (err) {
        // console.error(err.message);
        // throw err;
        showError(err, 'getBeers')
      }
    },

    getBeerDetail: async id => {
      try {
        renderLoader('hide', 'show');
        // const response = await fetch(`${beersAPIEndpoint}${id}`, apiOptionsGet);
        axiosGetOptions.url = `${beersAPIEndpoint}${id}`
        const response = await axios(axiosGetOptions);
        if (response.data.success) {
          renderLoader('show', 'hide');
          // const data = await response.json();
          return response.data.beer;
        }
        
      } catch (err) {
        // console.error(err);
        // throw err;
        err.message = `Error getting details of beer (Ref. ${id})`;
        showError(err, 'getBeerDetail');
      }
    },

    getQuotes: async id => {
      try {
        // const response = await fetch(`${beersAPIEndpoint}${id}`, apiOptionsGet);
        axiosGetOptions.url = `${beersAPIEndpoint}${id}`;
        const response = await axios(axiosGetOptions);
        if (response.data.success) {
          // const data = await response.json();
          if (response.data.beer.comment == undefined) return [];
          const comments = response.data.beer.comment;
          return comments;
        }
      } catch (err) {
        // console.error(err);
        // throw err;
        err.message = `Error getting quotes of beer (Ref. ${id})`
        showError(err, 'getQuotes');
      }
    },
    
    createQuote: async (id, text) => {
      // API beer - POST options
      const axiosPostConfig = {
        method: 'post',
        url: `${beersAPIEndpoint}${id}/comment`,
        data: JSON.stringify({ comment: text }),
        headers: {
          'Content-type': 'application/json',
          'X-API-KEY': API_KEY,
        },
      };
      try {
        // const response = await fetch(`${beersAPIEndpoint}${id}/comment`, configPost);
        const response = await axios(axiosPostConfig);
        console.log('Post: ', response);
        return response;
      } catch (err) {
        // console.error(err);
        // throw err;
        err.message = 'Error creating quote';
        showError(err, 'createQuotes');
      }
    },
  };
};

export default api;
