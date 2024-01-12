const { expect } = require('@playwright/test')
const { Page } = require('./Page')
const selectors = require('../selectors.json')
import * as helper from "../utils/Helper";

exports.HomePage = class HomePage extends Page {

    constructor(page) {
        super(page)
        this.page = page
    }

    // {value: az, za, lohi, hilo}
    async sortListing(value) {
        const select = await this.page.locator(selectors.HOMEPAGE_ELEMENTS.SORTING_SELECT)
        await select.selectOption(value)
    }

    async getCurrentPrices() {
        const priceList = await this.page.locator(selectors.HOMEPAGE_ELEMENTS.PRODUCT_PRICE).all()
        const prices = []

        for (let i = 0; i < priceList.length; i++) {
            prices[i] = await priceList[i].textContent()
        }
        return helper.removeCurrency(prices)
    }

    async assertSortedProductsLoHi() {
        const currentPrices = await this.getCurrentPrices()
        const currentPricesAsNumbers = await helper.getNumberArray(currentPrices)
        let sortedPrices = await helper.sortArrayAsc(currentPricesAsNumbers)
        expect(currentPricesAsNumbers).toEqual(sortedPrices)
    }

    async assertSortedProductsHiLo() {
        const currentPrices = await this.getCurrentPrices()
        const currentPricesAsNumbers = await helper.getNumberArray(currentPrices)
        let sortedPrices = await helper.sortArrayDesc(currentPricesAsNumbers)
        expect(currentPricesAsNumbers).toEqual(sortedPrices)
    }

    async addRandomProductToCart() {
        const productCounter = await this.page.locator(selectors.HOMEPAGE_ELEMENTS.ADD_TO_CART_BUTTON).count()
        const randomProductNo = Math.floor(Math.random() * productCounter)
        await this.page.locator(selectors.HOMEPAGE_ELEMENTS.ADD_TO_CART_BUTTON).nth(randomProductNo).click()
        return this.page.locator(selectors.HOMEPAGE_ELEMENTS.ITEM_NAME).nth(randomProductNo).textContent()
    }

    async moveToCart() {
        await this.page.locator(selectors.HOMEPAGE_ELEMENTS.CART_ICON).click()
        await expect(this.page.locator(selectors.CART_ELEMENTS.HEADER)).toHaveText(selectors.TEXTS.CART_HEADER)
    }
}