import { test, expect } from '@playwright/test';
import Account from '../pages/account.page';
import TransferPage from '../pages/transfer.page';

test.afterEach(async ({page}, testInfo)=>{

    if(testInfo.status === 'failed'){

        await page.screenshot({
            path:`screenshots/${testInfo.title}.png`,
            fullPage:true
        });

    }

});

test('Multi-tab: Transfer reflects in second tab', async ({ browser }) => {

    // Create browser context
    const context = await browser.newContext();

    // ------------------- Tab 1 -------------------
    const tab1 = await context.newPage();
    const account = new Account(tab1)
    await tab1.goto('/bank/login');
    const beforeBalance = await account.getAccountBalance('acc-savings-1')
    // ------------------- Tab 2 -------------------
    const tab2 = await context.newPage();

    await tab2.goto('/bank/dashboard');

    await expect(tab2).toHaveURL(/dashboard/);
    // ------------------- Transfer in Tab 1 -------------------
    const transfer = new TransferPage(tab1)
    await transfer.navigateToTransfer()
    await transfer.verifySuccessfulFunds('10')
    // ------------------- Verify in Tab 2 -------------------
    await tab2.reload();
    const account2 = new Account(tab2)
    const afterBalance = await account2.getAccountBalance('acc-savings-1')
    expect(afterBalance).toBe(beforeBalance - 10);
})