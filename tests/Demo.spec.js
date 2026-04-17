require('dotenv').config();
const { test } = require('@playwright/test');
const path = require('path');
const data = require('../testData/data.json');
const LoginPage = require('../pages/LoginPage');

test.use({ browserName: 'chromium' });

test('Demo: Naukri login flow', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto(data.baseURL, { waitUntil: 'networkidle' });
  await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
});
