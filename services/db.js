// @ts-check
import { LowSync, JSONFileSync } from 'lowdb';
import websites from '../config/websites.js';

// Adapter
const adapter = new JSONFileSync('data/db.json');
const db = new LowSync(adapter);

const applyDefaults = (data, defaults) => {
    for (const key in defaults) {
        if (!(key in data)) {
            data[key] = defaults[key];
        }
    }
}

// init db by looking at websites config
const dbInit = websites.reduce((obj, website) => {
    obj.housesLinks[website.name] = [];
    obj.housesDetails[website.name] = [];
    return obj;
}, {
    housesLinks: {},
    housesDetails: {}
});

try {
    db.read();
    db.data ||= {};
} catch (error) {
    db.data = {};
}

// Se il db è vuoto, inizializzalo con tutto dbInit
if (!db.data || Object.keys(db.data).length === 0 || (db.data.housesLinks === undefined && db.data.housesDetails === undefined)) {
    db.data = dbInit;
} else {
    for (const key in dbInit.housesLinks) {
        if (!(key in db.data.housesLinks)) {
            db.data.housesLinks[key] = dbInit.housesLinks[key];
        }
        if (!(key in db.data.housesDetails)) {
            db.data.housesDetails[key] = dbInit.housesDetails[key];
        }
    }
}

applyDefaults(db.data, dbInit);
db.write();

export default db;


