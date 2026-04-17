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
       async openlogin() {
        await this.click(this.openLoginBtn)
       }

       async enterUserName(username) {
        await this.fill(this.userNameInput, username)
       }
       async enterPassword(password) {
        await this.fill(this.pswrdInput, password)
       }

       async clickLogin(){
        await this.click(this.submitLoginBtn)
       }

       async login(username, password){
        await this.openlogin()
        await this.enterUserName(username)
        await this.enterPassword(password)
        await this.clickLogin()
       }
    }

    module.exports = LoginPage