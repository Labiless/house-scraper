const websites = [
    {
        timeout: 500,
        name: 'pararius_utrecht',
        baseUrl: 'https://www.pararius.com',
        url: 'https://www.pararius.com/apartments/utrecht/800-1750',
        houseCardSelector: 'li.search-list__item.search-list__item--listing',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: 'body > main > article > section.page__details.page__details--transfer > div > dl > dd.listing-features__description.listing-features__description--offered_since > span',
            addressSelector: 'h1.listing-detail-summary__title',
            priceSelector: '.listing-detail-summary__price-main',
        }
    },
]

export default websites;