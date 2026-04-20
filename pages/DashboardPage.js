const BasePage = require('./BasePage')

class DashboardPage extends BasePage {
    constructor (page){
        super(page)
        this.page = page

        this.naukriLogo = '(//*[@alt="Naukri Logo"]/img)[1]'
        this.Jobs = '(//a[@class="nI-gNb-menuItems__anchorDropdown"])[1]'
        // this.companies = '(//a[@class="nI-gNb-menuItems__anchorDropdown"])[2]'
        // this.services = '(//a[@class="nI-gNb-menuItems__anchorDropdown"])[3]'
        // this.searchbox = '.nI-gNb-sb__placeholder'
        this.recommendText = 'text=Recommended jobs for you'
        this.viewallBtn = '//span[text()="View all"]'
        this.viewProfileBtn = '//*[@class="view-profile-wrapper"]/a'
        this.notificatioIcon =  '//*[@class="nI-gNb-notif-center"]/div/span'
        // this.homeTab = '(//*[@class="tabs-li"]/span)[1]' 
       
        }

        async isLogoVisible(){
            return await this.page.locator(this.naukriLogo).isVisible()
        }
        async jobstext(){
            await this.page.locator(this.Jobs).click()
        }
        // async company(){
        //     await this.page.locator(this.companies).click()
        // }
        // async service(){
        //     await this.page.locator(this.services).click()
        // }
        // async search(){
        //     await this.page.locator(this.searchbox).click()
        // }
        // async viewall(){
        //     await this.page.locator(this.viewallBtn).click()
        // }
        async getRecommendedText(){
            return await this.getText(this.recommendText)
        }
        async profileBtn(){
            return await this.page.locator(this.viewProfileBtn).isVisible()
        }
        async isNotificationIconVisible(){
            return await this.page.locator(this.notificatioIcon).isVisible()
        }
        // async clickHomeTab(){
        //     await this.page.locator(this.homeTab).click()
        // }

    }
    module.exports = DashboardPage