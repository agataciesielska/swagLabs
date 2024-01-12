import { test } from '@playwright/test';
const { HomePage } = require('../page-objects/HomePage')
const { LoginPage } = require('../page-objects/LoginPage')

test.describe('Listing Tests', () => {

    test('User should be able to sort products by price (low to high)', async ({ page }) => {
      const homePage = new HomePage(page)
      const loginPage = new LoginPage(page)

      await loginPage.open()
      await loginPage.loginStandardUser()
      await homePage.sortListing('lohi')
      await homePage.assertSortedProductsLoHi()
    })

    test('User should be able to sort products by price (high to low)', async ({ page }) => {
      const homePage = new HomePage(page)
      const loginPage = new LoginPage(page)

      await loginPage.open()
      await loginPage.loginStandardUser()
      await homePage.sortListing('hilo')
      await homePage.assertSortedProductsHiLo()
    })
  })
