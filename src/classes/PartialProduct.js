const Product = require("./Product");

module.exports = class PartialProduct {

    /**
     * Create partial product with product data from search
     * @param {Object} Data API Response
     */
    constructor(Data) {
                
        this.name         = Data.Name;
        this.description  = Data.Description;
        this.code         = Data.Stockcode;
        this.price        = Data.Price;
        this.brand        = Data.Brand == 'woolworths' ? 'Homebrand' : Data.Brand;
        
        this.thumbnails   = {
            small  : Data.SmallImageFile,
            medium : Data.MediumImageFile,
            large  : Data.LargeImageFile
        }

        this.on_special   = Data.IsOnSpecial;
        this.in_stock     = Data.IsInStock;

        this.package_size = Data.PackageSize;

        this.ratings      = {

            count : Data.Rating.RatingCount,
            value : Data.Rating.Average.toFixed(2)

        }

        this.ingredients  = Product.parse_ingredients(Data.AdditionalAttributes.ingredients); 

        this.raw          = Data;

    }


    /**
     * Fetch full product information. Equivalent to Product.from_stockcode(PartialProduct.code)
     * @returns {Promise} Constructed Product
     */
    fetch = () => {

        return Product.from_stockcode(this.code);

    }

}