import puppeteer from 'puppeteer';
import db from './db.js';

const getNewHousesLink = async (rentalWebsite, page) => {
    await page.goto(rentalWebsite.url, { waitUntil: 'domcontentloaded' });
    try {
        await page.waitForSelector(rentalWebsite.houseCardSelector, { timeout: rentalWebsite.timeout });
    } catch (error) {
        return [];
    }
    const hrefs = await page.$$eval(rentalWebsite.houseCardSelector, elements =>
        elements.map(el => {
            const link = el.tagName === "A" ? el : el.querySelector('a');
            return link ? link.getAttribute('href') : null;
        })
    );
    return hrefs.map(link => `${rentalWebsite.baseUrl}${rentalWebsite.removeUrlParam ? link.split('?')[0] : link}`);
};

const compareNewLinkWithOldLinks = (rentalWebsite, newLinks) => {
    const oldLinks = db.data.housesLinks[rentalWebsite.name];
    const newLinksToSave = newLinks.filter(link => !oldLinks.includes(link));
    return newLinksToSave;
}

const compareNewHousesWithOldHouses = (rentalWebsite, newHouses) => {
    const oldHouses = db.data.housesLinks[rentalWebsite.name];
    const newHousesDetailsToSave = newHouses.filter(house =>
        !findNewHouseInOldHouses(house, oldHouses)
    );
    return newHousesDetailsToSave;
}

const findNewHouseInOldHouses = (newHouse, oldHouses) => {
    for (const oldHouse of oldHouses) {
        if (oldHouse.postingDate === newHouse.postingDate &&
            oldHouse.address === newHouse.address &&
            oldHouse.price === newHouse.price) {
            return true;
        }
    }
    return false;
}


const saveNewLinksToDb = (rentalWebsite, newLinks) => {
    if (newLinks.length > 0) {
        db.data.housesLinks[rentalWebsite.name].push(...newLinks);
        db.write();
    }
}
const saveNewHousesToDb = (rentalWebsite, newHouses) => {
    if (newHouses.length > 0) {
        db.data.housesDetails[rentalWebsite.name].push(...newHouses);
        db.write();
    }
}

const getHouseDetails = async (rentalWebsite, houseLink, page) => {
    let postingDate, address, price = null;
    await page.goto(houseLink, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(rentalWebsite.housePage.addressSelector, { timeout: rentalWebsite.timeout }); // aspetta fino a 5s

    postingDate = await safeEvalText(page, rentalWebsite.housePage.postingDateSelector);
    address = await safeEvalText(page, rentalWebsite.housePage.addressSelector);
    price = await safeEvalText(page, rentalWebsite.housePage.priceSelector);

    return {
        houseLink,
        postingDate,
        address,
        price
    };
}

// find new houses for one website
export const findNewHouses = async (rentalWebsite) => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    console.log(`Searching for ${rentalWebsite.name.toUpperCase()}`);
    const newLinks = compareNewLinkWithOldLinks(rentalWebsite, await getNewHousesLink(rentalWebsite, page));
    saveNewLinksToDb(rentalWebsite, newLinks);

    const housesDetails = [];
    for (let i = 0; i < newLinks.length; i++) {
        const houseDetail = await getHouseDetails(rentalWebsite, newLinks[i], page);
        housesDetails.push(houseDetail);
    }
    await browser.close();

    let goodHouses = [];
    if (housesDetails.length > 0) {
        goodHouses = compareNewHousesWithOldHouses(rentalWebsite, housesDetails);
        saveNewHousesToDb(rentalWebsite, goodHouses);
    }
    console.log(`Found ${goodHouses.length} houses for ${rentalWebsite.name.toUpperCase()}\n`);
    return goodHouses;
};

const safeEvalText = async (page, selector) => {
    try {
        return await page.$eval(selector, el => el.innerText);
    } catch {
        return null;
    }
};