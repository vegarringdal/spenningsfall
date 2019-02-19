import * as puppeteer from 'puppeteer';


describe('puppeteer tests- TODO', () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        page = await browser.newPage();
    });

    it('puppeteer tests- TODO 1', async () => {
        await expect('1').toMatch('1');
    });

    afterAll(async () => {
        await page.close();
        await browser.close();
    });
});

