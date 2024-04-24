const puppeteer = require('puppeteer');
// const jsdom = require('jsdom')

describe("testing end to end...testing", () => {

    let browser, page;
    beforeEach(async () => {
		browser = await puppeteer.launch({
			headless: false,
			args: [
				"--window-size=1920,1080",
				// "--no-sandbox"
			],
			slowMo: 10
		});
	});

    afterEach(async () => {
        await browser.close();
    }
    );


    beforeEach(async ()=>{
        page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080, isLandscape: true, isMoble: false})
        await page.goto("http://localhost:5173/", {waitUntil: "load"})
    })

    afterEach(async ()=>{
        const allPages = await browser.pages()
        for(const page of allPages){
            await page.close()
        }
    })

    it("should load the page", async ()=>{
        const title = await page.title()
        expect(title).toBe("Sustainability Diary")
    })

    it("should be able to register/log in", async ()=>{
        await page.click("#login")
        await page.type("#email", "freddy.teach@ntnu.no")
        await page.type("#password", "freddy.teach@ntnu.no")
        await Promise.all([
            page.click("#logInBtn"),
            page.waitForNavigation()
        ])
        const textValue = await page.evaluate(()=>{
            return document.querySelector("h1").textContent
        })
        expect(textValue).toEqual("Teacher Dashboard")
        
    })

});

