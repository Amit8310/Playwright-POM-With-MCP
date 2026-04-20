require('dotenv').config();
const { test,expect } = require('@playwright/test');
const path = require('path');
const data = require('../testData/data.json');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const ProfilePage  = require('../pages/ProfilePage')

test.use({ browserName: 'chromium' });
let loginpage;
let dashboardpage;
let  profilepage;

test.beforeEach('verify pom page ', async ({ page }) => {
   loginpage = new LoginPage(page);
  await loginpage.navigate(data.baseURL, { waitUntil: 'networkidle' });
  await loginpage.login(process.env.PW_USERNAME, process.env.PW_PASSWORD);
});

test('verify the dashboard', async ({ page }) => {
 dashboardpage = new DashboardPage(page);
  // await dashboardpage.jobstext()
  const text = await dashboardpage.getRecommendedText();
  expect(text).toBe(data.dashboard.Text);
  await page.pause()
});

test('verify the profile',async({page})=>{
  profilepage = new ProfilePage(page)
  await profilepage.profileSlider()
  await profilepage.updateProfileBtn()
  await profilepage.updateCv(data.resumePath)
  const Msg = await profilepage.updateCvMsg()
  expect(Msg).toBe(data.Profile.Message)
})
