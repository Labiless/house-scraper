import websites from "./config/websites.js";
import { findNewHouses } from "./services/siteScraper.js";
import sendMail from "./services/email.js";
import fs from 'fs';
import path from 'path';

const minutes = 2; // minutes between each search

if (process.argv.slice(2).includes('--dv')) {
  const bannerPath = path.join(process.cwd(), 'dv.config');
  const banner = fs.readFileSync(bannerPath, 'utf8')
  console.log(banner);
}

const initSearch = async () => {
    console.log('\x1b[42m\x1b[30m %s \x1b[0m', '\nNEW ROUND--------\n');

    const results = [];

    for (let i = 0; i < websites.length; i++) {
        const newHouses = await findNewHouses(websites[i]);
        if (newHouses.length > 0) {
            results.push(
                {
                    name: websites[i].name,
                    newHouses: newHouses
                }
            )
        }
    }

    if (results.length > 0) {
        const mailBody = results.map(website => {
            return `<h2>${website.name}</h2>` + website.newHouses.map(house => {
                return `<a href="${house.houseLink}">${house.address}</a><br><p>${house.postingDate} - ${house.price}</p><p>---------------------</p>`;
            }).join('');
        }).join('');
        await sendMail(mailBody);
        console.log('Found new houses, email sent :)');
    }
    else {
        console.log('No new houses found :(');
    }

    setTimeout(async () => {
        await initSearch();
    }, 60000 * minutes);
    console.log('\x1b[43m\x1b[30m %s \x1b[0m', `\nNext search in ${minutes} minutes...`);
}
await initSearch();