import fs from 'fs';
import path from 'path';

const bannerPath = path.join(process.cwd(), 'dv.config');
const banner = fs.readFileSync(bannerPath, 'utf8')
console.log(banner);