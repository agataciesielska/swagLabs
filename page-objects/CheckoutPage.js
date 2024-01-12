const { expect } = require('@playwright/test')
const { Page } = require('./Page')
const selectors = require('../selectors.json')
import { faker } from '@faker-js/faker';

exports.CheckoutPage = class CheckoutPage extends Page {

    constructor(page) {
        super(page)
        this.page = page
    }

    async isProductPresent(itemName) {
        await expect(this.page.locator(selectors.HOMEPAGE_ELEMENTS.ITEM_NAME)).toHaveText(itemName)
    }

    async clickCheckoutButton() {
        await this.page.click(selectors.CART_ELEMENTS.CHECKOUT_BUTTON)
    }

    async clickContinueButton() {
        await this.page.click(selectors.CART_ELEMENTS.CONTINUE_BUTTON)
    }

    async clickFinishButton() {
        await this.page.click(selectors.CART_ELEMENTS.FINISH_BUTTON)
    }

    async fillInformationForm() {
        await this.page.locator(selectors.CART_ELEMENTS.FIRSTNAME_INPUT).fill(faker.person.firstName())
        await this.page.locator(selectors.CART_ELEMENTS.LASTNAME_INPUT).fill(faker.person.lastName())
        await this.page.locator(selectors.CART_ELEMENTS.POSTAL_CODE_INPUT).fill(faker.location.zipCode())
    }

    async assertOrderIsPlaced() {
        await expect(this.page.locator('h2')).toHaveText(selectors.TEXTS.ORDER_PLACED)
    }
}