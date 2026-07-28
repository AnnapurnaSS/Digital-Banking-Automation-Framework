import { expect } from "@playwright/test"
import logindata from '../testdata/logindata.json'


class Dashboard{
    constructor(page,accountPage){
        this.page = page
        this.account = accountPage
        this.dashbordurl=page.getByTestId('sidebar-link-dashboard')
        this.welcometext = page.locator('[data-testid="dashboard-welcome-message"]');
        this.totalnetworth = page.locator('[data-testid="stat-card-net-worth-value"]');
        this.transactionsdates = page.locator('[data-testid="recent-txn-date"]')
        this.actionlinks = page.locator('div.grid').last()
        this.modetitle = page.locator('.nav-module__Efbrta__themeToggle')
    }
    //Verify Dashboard Load
    // Assert welcome message is visible
    async dashoardVisible(){
        await this.page.goto('/bank/dashboard')
        await this.dashbordurl.click()
        // await this.page.waitForLoadState('load')
        await expect(this.welcometext).toBeVisible();
    }

    //Verify Total Balance Display
    //Calculate sum of all checking and savings accounts
     async balanceVerify(){
        const balances = await this.account.getBalance();
        await this.dashbordurl.click()
        const displayedTotal = await this.totalnetworth.textContent();
        let actualTotal = Number(displayedTotal.replace('$','').replace(',', ''))
        console.log(actualTotal);
        expect(balances).toBe(actualTotal)
     }

    //Verify Recent Transactions Widget
    async  recentTransaction(){
        const dates = await this.transactionsdates.allTextContents()
        // console.log(dates)
        const dateObjects = dates.map(date => new Date(date))
        let isDescending = true;
        for (let i = 0; i < dateObjects.length - 1; i++) {
            if (dateObjects[i] < dateObjects[i + 1]) {
                isDescending = false
                break
            }
        }
        console.log(isDescending)
        expect(isDescending).toBe(true)
    }

    // Verify Quick Link
    async linkverify(){
    const links = this.actionlinks
    const count = this.actionlinks.count()
    for (let l=0;l<=count;l++){
        let action = links.nth(l)
        await expect(action).toBeVisible() 
        await expect(action).toBeEnabled()
    }
}

    // Verify Theme Toggle
    async themeToggle(){   
    await expect(this.modetitle).toHaveAttribute('aria-label', 'Switch to dark mode')
    await this.modetitle.click()
    await expect(this.modetitle).toHaveAttribute('aria-label', 'Switch to light mode')
    }
    
}
export default Dashboard