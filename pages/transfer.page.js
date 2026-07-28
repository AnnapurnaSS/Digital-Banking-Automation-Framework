import { expect } from "@playwright/test";
import {selectCustomDropdown} from "../utils/dropdown.js";

class TransferPage {
    constructor(page) {
        this.page = page;
        // Navigation
        this.transferLink = page.getByTestId("sidebar-link-transfer");
        // Transfer form elements
        this.fromAccount = page.getByLabel('From Account');
        this.toAccount = page.getByLabel('To Account');
        this.amount = page.getByLabel('Amount');
        this.a1 = page.getByTestId('transfer-to-option').getByText('Everyday Checking — $')        
        this.a2 = page.locator("//div[text()='High-Yield Savings']")
        this.insufficientFundsError = page.locator('[data-testid="transfer-error-message"]').filter({hasText:'Insufficient funds.'})
        this.popconfirm = page.getByRole('button',{name:'Confirm Transfer'})
        this.reviewButton = page.getByTestId('review-transfer-btn')
        this.successfulFunds = page.locator('data-testid="transfer-success-heading"]').filter({hasText:'Transfer Successful'})
    }


    async navigateToTransfer() {
        await this.page.goto('/bank/transfer')
        await this.transferLink.click();
        await expect(this.page).toHaveURL(/transfer/);
    }


    async verifyTransferForm() {
        await this.page.goto('/bank/transfer')
        await expect(this.fromAccount).toBeVisible();
        await expect(this.toAccount).toBeVisible();
        await expect(this.amount).toBeVisible();
    }

    async verifyInsufficientFunds(amount) {
    await this.page.goto('/bank/transfer')
    await selectCustomDropdown(this.page,this.fromAccount,this.a2);
    await selectCustomDropdown(this.page,this.toAccount,this.a1);
    await this.amount.fill(amount);
    await this.reviewButton.click();
    await this.popconfirm.click();
    await expect(this.insufficientFundsError).toBeVisible();
    }
    async verifySuccessfulFunds(amount){
    await this.page.goto('/bank/transfer')
    await selectCustomDropdown(this.page,this.fromAccount,this.a2);
    await selectCustomDropdown(this.page,this.toAccount,this.a1);
    await this.amount.fill(amount);
    await this.reviewButton.click();
    await this.popconfirm.click();
    await expect(this.page).toHaveURL('https://qaplayground.com/bank/transfer/confirmation');
    }


}

export default TransferPage


