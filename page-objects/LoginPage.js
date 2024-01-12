const { expect } = require('@playwright/test')
const { Page } = require('./Page')
const selectors = require('../selectors.json')

exports.LoginPage = class LoginPage extends Page {

    constructor(page) {
        super(page)
        this.page = page
    }

    async loginStandardUser() {
        await this.typeLogin(process.env.STANDARD_USER)
        await this.typePassword(process.env.PASSWORD)
        await this.page.click(selectors.LOGINPAGE_ELEMENTS.LOGIN_BUTTON)
        await expect(this.page.locator(selectors.HOMEPAGE_ELEMENTS.LISTING_LABEL)).toHaveText(selectors.TEXTS.LISTING_HEADER)
    }

    async typeLogin(login) {
        await this.page.locator(selectors.LOGINPAGE_ELEMENTS.USERNAME_INPUT).fill(login)
    }

    async typePassword(password) {
        await this.page.locator(selectors.LOGINPAGE_ELEMENTS.PASSWORD_INPUT).fill(password)
    }
}