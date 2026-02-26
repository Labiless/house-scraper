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
    {
        timeout: 500,
        name: 'kamernet_utrecht',
        baseUrl: 'https://kamernet.nl/',
        url: 'https://kamernet.nl/en/for-rent/properties-utrecht?radius=5&minSize=19&maxRent=16&searchCategories=2%2C19',
        houseCardSelector: '#page-content > section:nth-child(2) > div > div:nth-child(3) > a',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: '#page-content > section > div > div.Header_details__5AMHI > p.MuiTypography-root.MuiTypography-body3.mui-149gk8w',
            addressSelector: '#map > p',
            priceSelector: '#cost-breakups > div > div:nth-child(1) > h6',
        }
    },
]

export default websites;