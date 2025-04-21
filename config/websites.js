const websites = [
    {
        timeout: 500,
        name: 'vgw',
        baseUrl: 'https://vgwgroup.nl',
        url: 'https://vgwgroup.nl/woningaanbod/huur/utrecht/type-appartement,woonhuis?locationofinterest=Utrecht&pricerange.maxprice=1750&pricerange.minprice=400',
        houseCardSelector: 'article.objectcontainer',
        removeUrlParam: true,
        housePage: {
            postingDateSelector: 'table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)',
            addressSelector: 'h1.obj_address',
            priceSelector: '.object_price',
        }
    },
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
        name: 'pararius_amsterdam',
        baseUrl: 'https://www.pararius.com',
        url: 'https://www.pararius.com/apartments/amsterdam/1100-1750',
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
        name: 'househunting_utrecht',
        baseUrl: '',
        url: 'https://househunting.nl/en/housing-offer/?type=for-rent&filter_location=Utrecht&lat=52.0919255&lng=5.1229572&street=&km=10&min-price=500&max-price=1700',
        houseCardSelector: 'li.location',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: '',
            addressSelector: '.single_adress > h2:nth-child(1)',
            priceSelector: '.single_price > h3:nth-child(1)',
        }
    },
    {
        timeout: 500,
        name: 'househunting_amsterdam',
        baseUrl: '',
        url: 'https://househunting.nl/en/housing-offer/?type=for-rent&filter_location=Amsterdam&lat=52.3675734&lng=4.9041389&street=&km=10&min-price=500&max-price=1700',
        houseCardSelector: 'li.location',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: '',
            addressSelector: '.single_adress > h2:nth-child(1)',
            priceSelector: '.single_price > h3:nth-child(1)',
        }
    },
    {
        timeout: 500,
        name: 'rotsvast_utrecht',
        baseUrl: '',
        url: 'https://www.rotsvast.nl/en/property-listings/?type=2&city=utrecht&office=0&minimumPrice[2]=800&maximumPrice[2]=1750',
        houseCardSelector: '.residence-gallery.clickable-parent',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: '',
            addressSelector: '#page-title > h1:nth-child(1)',
            priceSelector: '#info-price',
        }
    },
    {
        timeout: 500,
        name: 'rotsvast_amsterdam',
        baseUrl: '',
        url: 'https://www.rotsvast.nl/en/property-listings/?type=2&city=Amsterdam&office=0&minimumPrice[2]=800&maximumPrice[2]=1750',
        houseCardSelector: '.residence-gallery.clickable-parent',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: '',
            addressSelector: '#page-title > h1:nth-child(1)',
            priceSelector: '#info-price',
        }
    },
    {
        timeout: 500,
        name: 'huurwoningen_utrecht',
        baseUrl: 'https://www.huurwoningen.nl',
        url: 'https://www.huurwoningen.nl/in/utrecht/?price=700-2000',
        houseCardSelector: 'li.search-list__item.search-list__item--listing',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: '.listing-features__description--offered_since > span:nth-child(1)',
            addressSelector: '.listing-detail-summary__location',
            priceSelector: '.listing-detail-summary__price-main',
        }
    },
    {
        timeout: 500,
        name: 'huurwoningen_amsterdam',
        baseUrl: 'https://www.huurwoningen.nl',
        url: 'https://www.huurwoningen.nl/in/amsterdam/?price=700-2000',
        houseCardSelector: 'li.search-list__item.search-list__item--listing',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: '.listing-features__description--offered_since > span:nth-child(1)',
            addressSelector: '.listing-detail-summary__location',
            priceSelector: '.listing-detail-summary__price-main',
        }
    },
    {
        timeout: 500,
        name: 'kamernet_utrecht',
        baseUrl: 'https://kamernet.nl',
        url: 'https://kamernet.nl/huren/appartement-utrecht?listingTypes=2&maxRent=16&minSize=19&pageNo=1',
        houseCardSelector: 'a.MuiTypography-root.MuiTypography-inherit.MuiLink-root.MuiLink-underlineNone.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiCard-root ',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: 'p.MuiTypography-root:nth-child(5)',
            addressSelector: 'h3.MuiTypography-root',
            priceSelector: '.PropertyDetails_price__JsYS9 > h6:nth-child(1)',
        }
    },
    {
        timeout: 500,
        name: 'kamernet_amsterdam',
        baseUrl: 'https://kamernet.nl',
        url: 'https://kamernet.nl/huren/appartement-amsterdam?listingTypes=2&searchview=1&maxRent=16&minSize=19&radius=5&pageNo=1&sort=1',
        houseCardSelector: 'a.MuiTypography-root.MuiTypography-inherit.MuiLink-root.MuiLink-underlineNone.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded',
        removeUrlParam: false,
        housePage: {
            postingDateSelector: 'p.MuiTypography-root:nth-child(5)',
            addressSelector: 'h3.MuiTypography-root',
            priceSelector: '.PropertyDetails_price__JsYS9 > h6:nth-child(1)',
        }
    },
]

export default websites;