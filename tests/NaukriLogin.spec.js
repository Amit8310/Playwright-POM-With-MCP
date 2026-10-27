require('dotenv').config();
const { test, expect } = require('@playwright/test');
const fs = require('fs');

const data = require('../testData/data.json');
const LoginPage = require('../pages/LoginPage');
const ProfilePage = require('../pages/ProfilePage');

test.use({ headless: false, screenshot: 'off', video: 'off', trace: 'off' });

test('updates resume, headline, key skills, profile summary, job profile, and first project', async ({ page }) => {
  test.setTimeout(180_000);

  const loginPage = new LoginPage(page);
  await loginPage.navigate(data.baseURL, { waitUntil: 'domcontentloaded' });
  const { PW_USERNAME, PW_PASSWORD } = process.env;
  if (!PW_USERNAME || !PW_PASSWORD) {
    throw new Error('Set PW_USERNAME and PW_PASSWORD in the environment or .env file.');
  }
  await loginPage.login(PW_USERNAME, PW_PASSWORD);
  await expect(page).toHaveURL(/naukri\.com\/mnjuser\/homepage/);

  const profilePage = new ProfilePage(page);
  await profilePage.navigateToProfile();
  await expect(page).toHaveURL(/naukri\.com\/mnjuser\/profile/);

  await test.step('Upload resume', async () => {
    if (fs.existsSync(data.resumePath)) {
      await profilePage.updateCv(data.resumePath);
      await expect(profilePage.getUpdateMessage()).toHaveText(data.Profile.Message);
    } else {
      console.warn(`Resume upload skipped: configured file is not available at ${data.resumePath}`);
    }
  });

  await test.step('Toggle the final full stop in the resume headline', async () => {
    const { currentHeadline, updatedHeadline } = await profilePage.toggleHeadlineFinalPeriod();
    expect(updatedHeadline.endsWith('.')).toBe(!currentHeadline.endsWith('.'));
    await expect(profilePage.getHeadlineText()).toContainText(updatedHeadline);
  });

  await test.step('Replace JMeter with Appium', async () => {
    await profilePage.keySkillsQuickLink.click();
    await expect(profilePage.keySkillsHeading).toBeVisible();
    await profilePage.replaceKeySkill('Appium', 'JMeter');
  });

  // await test.step('Replace Appium with JMeter', async () => {
  //   await profilePage.replaceKeySkill('JMeter', 'Appium');
  // });

  await test.step('Toggle the final full stop on the first employment job profile', async () => {
    await profilePage.toggleFirstEmploymentJobProfilePeriod();
  });

  await test.step('Toggle final punctuation and team size on the first project', async () => {
    await profilePage.toggleFirstProjectDetailsPeriodAndTeamSize();
  });

  await test.step('Toggle the final pipe in profile summary', async () => {
    const { currentSummary, updatedSummary } = await profilePage.toggleProfileSummaryFinalPipe();
    expect(updatedSummary.trimEnd().endsWith('|')).toBe(!currentSummary.trimEnd().endsWith('|'));
  });
});
