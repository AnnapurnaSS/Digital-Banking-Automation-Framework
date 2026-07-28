import { test, expect } from '../../fixtures/testFixtures.js';
import logindata from '../../testdata/logindata.json'

test.afterEach(async ({page}, testInfo)=>{

    if(testInfo.status === 'failed'){

        await page.screenshot({
            path:`screenshots/${testInfo.title}.png`,
            fullPage:true
        });

    }

});


for (let d of logindata["valid"]){
    test(`Logintest-${d.usn}`, async({page, loginPage,logout}) => {
        await page.goto('/bank/login');
        await loginPage.validlogin(d.usn,d.pass);

})};

for (let d of logindata["invalid"]){
    test(`invalidLogintest-${d.usn}`, async({page, loginPage,logout}) => {
        await page.goto('/bank/login');
        await loginPage.invalidlogin(d.usn,d.pass)
})}



