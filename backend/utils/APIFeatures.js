class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // api/v1/products?keyword=value
    search() {
        let keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: 'i',
                  },
              }
            : {};
        this.query.find({ ...keyword });
        return this;
    }

    // api/v1/products?keyword=value&price[gte]=100&price[lte]=1000
    // api/v1/products?price[gte]=100&price[lte]=1000
    filter() {
        const queryStrCopy = {
            ...this.queryStr,
        };

        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach((field) => delete queryStrCopy[field]);

        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        // {"price": {"$lt": "500","$gt": "1000"}}
        this.query.find(JSON.parse(queryStr));
        return this;
    }

    // api/v1/products?page=1
    pageinate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
