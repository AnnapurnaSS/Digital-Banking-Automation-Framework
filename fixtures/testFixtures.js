import { test as base,expect } from '@playwright/test';
import login from "../pages/login.page";
import logindata from '../testdata/logindata.json'
import Account from '../pages/account.page';
import Dashboard from '../pages/dashbord.page';
import TransferPage from '../pages/transfer.page';
import BillPay from '../pages/billpay.page'

export const test = base.extend({

    loginPage: async({page}, use) => {
            await use(new login(page));
        },
    accountPage: async ({ page }, use) => {
        await use(new Account(page));
     },
    dashboardPage: async ({ page, accountPage }, use) => {
        await use(new Dashboard(page, accountPage));
     },
    transferPage: async ({page}, use) => {
        await use(new TransferPage(page));
    },
    payBillPage: async ({page}, use) => {
        await use(new BillPay(page));
    },
    logout: async({page},use)=>{
        await use(page)
        await page.locator('[data-testid="topbar-logout-btn"]').click()
    }
    // multitab: async({page,accountPage},use) =>{
    //     await use(new (page, accountPage))
    // }
    
})

export { expect };