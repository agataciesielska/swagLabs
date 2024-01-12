import { test } from '@playwright/test';
const { HomePage } = require('../page-objects/HomePage')
const { LoginPage } = require('../page-objects/LoginPage')
const { CheckoutPage } = require('../page-objects/CheckoutPage')

test.describe('Checkout Tests', () => {

    test('User should be able to buy purchase product', async ({ page }) => {
        const homePage = new HomePage(page)
        const loginPage = new LoginPage(page)
        const checkoutPage = new CheckoutPage(page)

        await loginPage.open()
        await loginPage.loginStandardUser()
        const itemName = await homePage.addRandomProductToCart()
        await homePage.moveToCart()
        await checkoutPage.isProductPresent(itemName)
        await checkoutPage.clickCheckoutButton()
        await checkoutPage.fillInformationForm()
        await checkoutPage.clickContinueButton()
        await checkoutPage.isProductPresent(itemName)
        await checkoutPage.clickFinishButton()
        await checkoutPage.assertOrderIsPlaced()
    })
})
