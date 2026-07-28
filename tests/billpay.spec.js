import { test, expect } from '../fixtures/testFixtures.js'

test.afterEach(async ({page}, testInfo)=>{

    if(testInfo.status === 'failed'){

        await page.screenshot({
            path:`screenshots/${testInfo.title}.png`,
            fullPage:true
        });

    }

});

test('Verify billpay', async ({payBillPage,page,logout})=>{
    await payBillPage.navigateToTransfer()
    await payBillPage.verifybillpay()
    await payBillPage.payBill('City Electric Co.','450')
    
})
