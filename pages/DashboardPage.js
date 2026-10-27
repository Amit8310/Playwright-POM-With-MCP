const BasePage = require('./BasePage')

class DashboardPage extends BasePage {
    constructor (page){
        super(page)
        this.page = page
        this.viewProfileBtn = '//*[@class="view-profile-wrapper"]/a'
    }

    async clickViewProfile() {
        await this.page.locator(this.viewProfileBtn).click()
    }
}

module.exports = DashboardPage