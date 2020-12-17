const Fetch = require('node-fetch');
const URL   = 'https://www.woolworths.com.au/apis/ui/product/detail/';

module.exports = class Product {

    /**
     * Create product with API response data
     * @param {Object} Data API Response
     */
    constructor(Data) {
        
        this.name         = Data.Product.Name;
        this.description  = Data.Product.Description;
        this.code         = Data.Product.Stockcode;
        this.price        = Data.Product.Price;
        this.brand        = Data.Product.Brand == 'woolworths' ? 'Homebrand' : Data.Product.Brand;
        
        this.thumbnails   = {
            small  : Data.Product.SmallImageFile,
            medium : Data.Product.MediumImageFile,
            large  : Data.Product.LargeImageFile 
        }

        this.on_special   = Data.Product.IsOnSpecial;
        this.in_stock     = Data.Product.IsInStock;

        this.package_size = Data.Product.PackageSize;

        this.ratings      = {

            count : Data.Product.Rating.RatingCount,
            value : Data.Product.Rating.Average.toFixed(2)

        }

        this.aisle        = Data.Product.PrimaryCategory.Aisle;
        this.department   = Data.Product.PrimaryCategory.Department;

        this.nutrition    = Product.parse_nutritional_information(Data.NutritionalInformation);
        this.ingredients  = Product.parse_ingredients(Data.AdditionalAttributes.ingredients); 

        this.raw          = Data;

    }

    /**
     * Create product by stockcode
     * @param {Number|String} Stockcode
     * @returns {Promise} Constructed product
     */
    static from_stockcode = Stockcode => {
        
        return Fetch(URL + Stockcode).then(res => res.json()).then(json => new Product(json));

    }

    /**
     * Convert the NutritionalInformation object into a more human readable format
     * @param {Object} Data NutritionalInformation field of a product API response
     * @returns {Object} Parsed nutritional information
     */
    static parse_nutritional_information = Data => {

        if(!data) return {};

        const Nutrition = {};

        const format_name = index => {

            const Current  = Data[index].Name;
            const Previous = (index - 1 > 0) ? format_name(index - 1) : '';

            return Current.match(/^– /) ? `${Previous.match(/, total$/) ? Previous.slice(0, -7) : Previous} — ${Current.slice(2)}` : Current;

        }

        for(let index in Data) {

            const Field = Data[index];
            
            let name = format_name(index);

            Nutrition[name] = {

                serving: {
                    size: Field.ServingSize,
                    per_pack: Field.ServingsPerPack || 1
                }

            }

            for(let key of Object.keys(Field.Values)) {

                Nutrition[key] = Field.Values[key];
            }
            
        }

        return Nutrition;

    }

    /**
     * Convert the string of AdditionalAttributes.ingredients into an Array of ingredients
     * @param {String} Ingredients AdditionalAttributes.ingredients field of a product API response
     * @returns {Array<String>} Array of ingredients
     */
    static parse_ingredients = Ingredients => {

        if(!Ingredients) return [];
        
        const List = [];

        let paren  = 0;
        let string = '';

        for(let character of Ingredients) {

            if(character == '(') paren++;
            if(character == ')') paren--;

            if(character == ' ' && string.length == 0) continue;
            if(character == ',' && paren == 0  ) { List.push(string); string = ''; }

            else string += character;

        }

        return List;

    }

}