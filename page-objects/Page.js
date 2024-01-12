const { expect } = require('@playwright/test')
const selectors = require('../selectors.json')

exports.Page = class Page {

    constructor(page) {
        this.page = page
    }

    async open() {
        await this.page.goto(process.env.BASEURL)
    }
}