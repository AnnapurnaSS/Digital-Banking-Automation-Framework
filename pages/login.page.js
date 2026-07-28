import { expect } from "@playwright/test"
import logindata from '../testdata/logindata.json'
class login{
    constructor(page){
        this.page = page
        this.url = 'https://qaplayground.com/bank/login'
        this.username = page.locator('#login-username')
        this.password = page.locator('#login-password')
        this.rememberme = page.locator('#login-remember-me')
        this.button = page.getByRole('button',{name:'Sign In'})
        this.forgotpassword = page.locator('[data-testid="forgot-password-link"]')
        this.errormessage = page.getByTestId('login-error-banner')
        
    }
    async validlogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        // await this.page.waitForTimeout(5000);
        await this.button.click();
        await expect(this.page).toHaveURL('/bank/dashboard');
        // await expect(this.errormessage).toBeVisible();

    }
    async invalidlogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        // await this.page.waitForTimeout(5000);
        await this.button.click();
        // await expect(this.page).toHaveURL('/bank/dashboard');
        await expect(this.errormessage).toBeVisible();

    }
    
}
export default login