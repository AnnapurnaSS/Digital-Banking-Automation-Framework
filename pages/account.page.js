import { expect } from "@playwright/test"
class Account{
    constructor(page){
        this.page = page
        this.accountlink = page.getByTestId('sidebar-link-accounts')
        this.balancecol = page.locator('[data-testid="account-row-balance"]')
        this.openNewAccount = page.getByRole('button',{name:'Add Account'});
        this.accountname = page.locator('#account-form-name')
        // Account type dropdown
        this.accountType = page.locator('[data-slot="select-value"]');
        this.savingsOption = page.getByTestId('account-form-type-options').getByText('Savings');
           // Submit button
        this.submitButton = page.getByRole('button', { name: 'Add Account' });
        this.checkbox = page.locator('[for="account-form-accept-terms"]')
        // Newly created savings account
        this.balance = page.getByPlaceholder("0.00")
        // Everyday Checking
        //High-Yield Savings
    }
    async getBalance(){
        await this.page.goto('/bank/accounts')
        await this.accountlink.click()
        await this.balancecol.first().waitFor()
        let balance = await this.balancecol.allTextContents()
        console.log(balance)
        let sum = 0
        for (let bal of balance){
            sum += Number(bal.replace('$','').replace(',', ''))
        } 
        console.log("Calculated Balance:",sum)
        return sum
    }

    async accountpageverify(){
    await this.page.goto('/bank/accounts')
    await this.accountlink.click()
     // Verify Checking account is displayed
    await expect(this.page.getByRole('cell', { name: 'Checking', exact: true })).toBeVisible();
    // Verify Savings account is displayed
    await expect(this.page.getByRole('cell', { name: 'Savings', exact: true })).toBeVisible();
    // Verify account name is visible
    await expect(this.page.getByText('Everyday Checking')).toBeVisible();
    // Verify account number is masked
    await expect(this.page.getByText('****8765')).toHaveText(/^\*+\d{4}$/);
    }

    async overdraftAccount(name, amount) {
        await this.page.goto('/bank/accounts')
        await this.accountlink.click();
        await this.openNewAccount.click();
        await this.accountname.fill(name);
        await this.accountType.click();
        await this.savingsOption.click();
        await this.balance.fill(amount);
        await this.checkbox.click();
        await this.submitButton.click();
        const savingsAccount = this.page.locator('[data-testid="bank-main-content"]').getByText(name);
        await expect(savingsAccount).toBeVisible();

    }
    async getAccountBalance(accountId) {
    await this.page.goto('/bank/accounts')
    await this.accountlink.click();
    const row = this.page.locator(`[data-account-id="${accountId}"]`);
    const balance = await row.locator('[data-testid="account-row-balance"]').textContent();
    return Number(balance.replace('$', '').replace(/,/g, ''));
}


    }

export default Account