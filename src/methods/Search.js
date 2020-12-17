const Fetch = require('node-fetch');
const Product = require('../classes/Product');

/**
 * Search Woolworth's catalogue
 * @param {String} Query Search query
 * @param {Number} Page Page number of search results. Starts at and defaults to 1
 * @returns {Promise} Search results
 */
module.exports = (Query, Page = 1, PageSize = 24) => {

    return new Promise((resolve, reject) => {

        Fetch(`https://www.woolworths.com.au/apis/ui/Search/products/`, {

            method: 'POST',

            headers: {
                'Content-Type' : `application/json`,
                'origin'       : `https://www.woolworths.com.au`,
                'referer'      : `https://www.woolworths.com.au/shop/search/products?searchTerm=${encodeURIComponent(Query)}`,
                'user-agent'   : `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36`,
            },

            body: JSON.stringify({

                Filters    : [],
                IsSpecial  : false,
                Location   : `/shop/search/products?searchTerm=${encodeURIComponent(Query)}`,
                PageNumber : Page,
                PageSize   : PageSize,
                SearchTerm : Query,
                SortType   : "TraderRelevance",

            })

        }).then(res => res.json()).then(Data => {
            
            if(Data.ResponseStatus ? Data.ResponseStatus.ErrorCode : false) return reject(new Error(`Unable to search (${Data.ResponseStatus.ErrorCode}): ${Data.ResponseStatus.Message}`));

            resolve({
                
                products: Data.Products.filter(listing => listing.Products ? listing.Products[0] : false).map(listing => new Product(listing.Products[0])),
                next: () => module.exports(Query, Page++)

            });

        }).catch(reject);

    });

}