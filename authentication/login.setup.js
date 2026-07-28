import { chromium, expect } from '@playwright/test';
import user from '../testdata/user.json'

export default async function globalSetup()
{   
    const browser = await chromium.launch();
    const context = await browser.newContext()
    const page = await context.newPage()
    // Open login page
    await page.goto('https://qaplayground.com/bank/login');
     // Enter credentials
    await page.locator('#login-username').fill(user.username);
    await page.locator('#login-password').fill(user.password);
    // Click login
    await page.getByRole('button',{name:'Sign In'}).click();
    // Verify login
    await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
    // Save session
    await page.context().storageState({path:'authentication/storageState.json'});


} 


