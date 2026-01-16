# A tool to find new houses in Netherlands

# Quickstart

This quickstart guide will help you run the project on your local machine.
The purpose of this tool is to scan a configured real estate website, search for newly available houses based on predefined search filters, and send an email every 2 minutes **only if new houses are found**.

> ⚠️ A **Gmail account** is required for this project to work, since emails are sent using **Gmail SMTP**.

---

## How to set up this project

### 1. Clone the repository

```bash
git clone https://github.com/Labiless/house-scraper.git
```

### 2. Install Node.js

Download and install Node.js from:
[https://nodejs.org/](https://nodejs.org/)

Make sure it is installed correctly:

```bash
node -v
npm -v
```

### 3. Install dependencies

From the project root, run:

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the following variables:

```env
GMAIL="yourgmail@gmail.com"
GMAIL_PASSWORD="app password"
```

---

## How to get a Gmail App Password

To send emails via Gmail SMTP, you must use an **App Password** (not your Gmail account password).

### 1. Enable 2-Step Verification

Go to:
[https://myaccount.google.com/security](https://myaccount.google.com/security)

Then navigate to:
**Signing in to Google** → **2-Step Verification**

Enable it if it is not already active.

### 2. Create an App Password

Go to:
[https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

* Select **Mail** as the app
* Select **Other** (or name it e.g. `NodeMailer Server`)
* Follow the procedure and generate a password

Use the generated password as the value of `GMAIL_PASSWORD` in your `.env` file.

---

## Real Estate Website Configuration

### Create the configuration for the real estate website

The only file you need to work with, besides the `.env` file, is:

```
config/website.js
```

This file allows you to configure the real estate websites you want to scan and define the search criteria you want to apply.

---

## Run the project

You can run the project with this command, there is already a test configuration so you can see if it works

```bash
npm run start
```

## Website configuration structure

Inside `config/website.js`, you will find a list of website configurations structured like this:

```js
{
    timeout: 500, 
    // Time (in milliseconds) to wait between each action in the headless browser.
    // You usually don’t need to change this.

    name: 'pararius_utrecht', 
    // A unique name for the website configuration.

    baseUrl: 'https://www.pararius.com', 
    // The base URL of the website (the first part of the URL).

    url: 'https://www.pararius.com/apartments/utrecht/800-1750', 
    // The URL of the search results page.
    // To obtain this URL, go to the website, apply all the filters you need
    // (city, price range, etc.), then copy and paste the URL here.

    houseCardSelector: 'li.search-list__item.search-list__item--listing', 
    // The CSS selector used by the website to display each house
    // in the search results page.

    removeUrlParam: false, 
    // Some websites append unnecessary parameters to the house URL.
    // Set this to true if those parameters should be removed.

    housePage: {
        // Selectors for the individual house detail page

        postingDateSelector: 'body > main > article > section.page__details.page__details--transfer > div > dl > dd.listing-features__description.listing-features__description--offered_since > span',
        // CSS selector for the posting date.

        addressSelector: 'h1.listing-detail-summary__title',
        // CSS selector for the house address.

        priceSelector: '.listing-detail-summary__price-main',
        // CSS selector for the house price.
    }
},
```

---

## Notes

* You can add multiple website configurations to monitor more than one real estate website.
* CSS selectors may change over time if the website updates its layout.
* If the scraper stops working, the first thing to check is whether the selectors are still valid.

---
