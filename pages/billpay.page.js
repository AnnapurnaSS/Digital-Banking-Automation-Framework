import { expect } from "@playwright/test";
import {selectCustomDropdown} from "../utils/dropdown";
import{CustomDropdown} from '../utils/dropdown'
class BillPay{
    constructor(page){
        this.page = page
        this.navigationurl = page.locator('[data-testid="sidebar-link-bill-pay"]')
        this.fromAccount = page.getByLabel('From Account');
        this.bill = page.getByLabel('Biller')
        this.amount = page.getByLabel('Amount');
        this.dateInput = page.getByTestId('bill-payment-date-input');
        this.memo = page.getByLabel('Memo (optional)')
        this.reviewpayment = page.getByRole('button',{name:'Review Payment'})
        this.confirmBtn = page.locator('[data-testid="confirm-bill-btn"]')
        this.a1 = page.getByTestId('transfer-to-option').getByText('Everyday Checking — $')        
        this.a2 = page.locator("//div[text()='High-Yield Savings']")

    }

        async navigateToTransfer() {
        await this.page.goto('/bank/bill-pay')
        await this.navigationurl.click();
        await expect(this.page).toHaveURL(/bill-pay/);
        }

        async verifybillpay(){
        await this.page.goto('/bank/bill-pay')
        await this.navigationurl.click();
        await expect(this.fromAccount).toBeVisible();
        await expect(this.bill).toBeVisible();
        await expect(this.amount).toBeVisible();
        await expect(this.dateInput).toBeVisible()

        }
        
        async payBill(biller, amount) {
            await this.page.goto('/bank/bill-pay')
            await this.navigationurl.click();
            await selectCustomDropdown(this.page,this.fromAccount,this.a2);
            await CustomDropdown(this.page,this.bill,biller)
            await this.amount.fill(amount);
            await this.reviewpayment.click();
            await this.confirmBtn.click();
            await expect(this.page).toHaveURL('https://qaplayground.com/bank/bill-pay/confirmation');
    }
}
export default BillPay;

