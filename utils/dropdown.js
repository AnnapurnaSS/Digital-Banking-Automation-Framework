export async function selectCustomDropdown(page, dropdown, option) {
    await dropdown.click();
    await option.click();
}

export async function CustomDropdown(page, dropdown, option) {
    // await dropdown.click();
    await dropdown.fill(option)
    await page.getByTestId('biller-option').click()
    
//     const suggestion = page.locator('[role="combobox"]').filter({
//     hasText: option
// });

//     await suggestion.waitFor({ state: 'visible' });
//     await suggestion.click();
}
    
    
