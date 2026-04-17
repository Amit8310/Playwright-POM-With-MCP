// const { test, expect } = require('@playwright/test');

// test.use({ browserName: 'chromium' });

// test('open chrome, click Open Tab in New Window, validate page text', async ({ page }) => {
//   await page.goto('https://vivtechguru.com/practice.html');

//   const [newPage] = await Promise.all([
//     page.waitForEvent('popup'),
//     page.getByRole('button', { name: 'Open Tab in New Window' }).click(),
//   ]);

//   await newPage.waitForLoadState('load');
//   await expect(newPage.locator('text=Comprehensive UI Testing Page')).toBeVisible();
// });
