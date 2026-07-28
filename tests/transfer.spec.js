import { test,expect } from '../fixtures/testFixtures';

test.afterEach(async ({page}, testInfo)=>{

    if(testInfo.status === 'failed'){

        await page.screenshot({
            path:`screenshots/${testInfo.title}.png`,
            fullPage:true
        });

    }

});

test('Verify Transfer',async ({ transferPage,page}) => {
    // 1. Navigate to Transfer page
    await transferPage.navigateToTransfer();
    // 2. Verify fields
    await transferPage.verifyTransferForm();
    //
    await transferPage.verifyInsufficientFunds('230000000');
    await transferPage.verifySuccessfulFunds('23');
    //


});

test('Verify balances after successful transfer',async ({ accountPage, transferPage, dashboardPage }) => {

    // Record balances
    const fromBalanceBefore =
        await accountPage.getAccountBalance('acc-savings-1');

    const toBalanceBefore =
        await accountPage.getAccountBalance('acc-checking-1');

    // Transfer $10
    await transferPage.navigateToTransfer();

    await transferPage.verifySuccessfulFunds('10');

    // Navigate to Dashboard
    await dashboardPage.dashoardVisible();

    // Get updated balances
    const fromBalanceAfter =
        await accountPage.getAccountBalance('acc-savings-1');

    const toBalanceAfter =
        await accountPage.getAccountBalance('acc-checking-1');
    console.log(fromBalanceAfter)
    console.log(fromBalanceBefore)
    // Assertions
    await expect(fromBalanceAfter).toBe(fromBalanceBefore - 10);

    await expect(toBalanceAfter).toBe(toBalanceBefore + 10);

});