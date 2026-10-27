const BasePage = require('./BasePage')

class LoginPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page

      this.openLoginBtn = '#login_Layer';
      this.userNameInput = '[placeholder="Enter your active Email ID / Username"]'
      this.pswrdInput = '[placeholder="Enter your password"]'
      this.submitLoginBtn = '(//*[@type="submit"])[1]'
    }
   async login(username, password) {
      await this.click(this.openLoginBtn)
      await this.fill(this.userNameInput, username)
      await this.fill(this.pswrdInput, password)
      await this.click(this.submitLoginBtn)
   }
}

module.exports = LoginPage