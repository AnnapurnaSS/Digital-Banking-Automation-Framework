import { test, expect } from '../fixtures/testFixtures.js'

test.afterEach(async ({page}, testInfo)=>{

    if(testInfo.status === 'failed'){

        await page.screenshot({
            path:`screenshots/${testInfo.title}.png`,
            fullPage:true
        });

    }

});

test('Verify Account', async ({accountPage,page,logout})=>{
    await accountPage.accountpageverify()
    await accountPage.overdraftAccount('anna','23000')

})

