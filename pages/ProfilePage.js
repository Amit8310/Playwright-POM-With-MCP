const BasePage = require('./BasePage')

class ProfilePage extends BasePage {
    constructor(page) {
        super(page)
        this.page= page

        this.slider = '.nI-gNb-drawer__icon'
        this.updateProfile = '.nI-gNb-info__sub-link'
        this.updateResume = '//input[@value="Update resume"]'
        this.updatedText = '.msg'
    }
    
      async profileSlider(){
            await this.page.locator(this.slider).click()
        }
    async updateProfileBtn(){
        await this.page.locator(this.updateProfile).click()
    }
    async updateCv(filepath){
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
        await this.page.locator(this.updateResume).click()
        ])
        await fileChooser.setFiles(filepath);
    }
    async updateCvMsg(){
        await this.page.locator(this.updatedText)
    }
}
module.exports = ProfilePage
