import { test, expect } from '../fixtures/testFixtures.js'

test.afterEach(async ({page}, testInfo)=>{

    if(testInfo.status === 'failed'){

        await page.screenshot({
            path:`screenshots/${testInfo.title}.png`,
            fullPage:true
        });

    }

});

test('Verify dashboard', async ({dashboardPage,page,logout}) => { 
    //Verify Dashboard Loada and Assert welcome message is visible
    await dashboardPage.dashoardVisible();
    //Verify Total Balance Display and Calculate sum of all checking and savings accounts
    await dashboardPage.balanceVerify();
    //Verify Recent Transactions Widget
    await dashboardPage.recentTransaction();
    // Verify Quick Link
    await dashboardPage.linkverify()
    // Verify Theme Toggle
    await dashboardPage.themeToggle() 
});