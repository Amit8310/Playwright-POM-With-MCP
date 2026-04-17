class BasePage {
    constructor(page) {
        this.page = page;
    }

    async click(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    async type(selector, text) {
        await this.page.waitForSelector(selector);
        await this.page.type(selector, text);
    }
    async getText(selector) {
        await this.page.waitForSelector(selector);
        return await this.page.textContent(selector);
    }
    async isVisible(selector) {
        await this.page.waitForSelector(selector);
        return await this.page.isVisible(selector);
    }
    async waitForSelector(selector) {
        await this.page.waitForSelector(selector);
    }
    async navigate(url) {
        await this.page.goto(url);
    }
    async getLocator(selector) {
        await this.page.waitForSelector(selector);
        return this.page.locator(selector);
    }
    async selectOPtion(selector, value) {
        await this.page.waitForSelector(selector);
        await this.page.selectOption(selector, value);
    }
    async scrollTo(selector) {
        await this.page.scrollTo(selector);
    }
    async fill(selector, value){
        await this.page.locator(selector).fill(value)
    }

}
module.exports = BasePage
