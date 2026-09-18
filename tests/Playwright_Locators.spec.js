const {test, expect} = require('@playwright/test')

test("Playwright Locators",async ({page}) =>{

    const slowExpect = expect.configure({timeout:10000});

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Employed').check();

    await page.getByPlaceholder('Password').fill('12');

    await page.getByRole('button', { name: 'Submit' }).click();
    // await page.pause();

    expect(await page.getByText('Success! The Form has been submitted successfully!.').isVisible()).toBeTruthy();

    await page.getByRole("link",{name:'Shop'}).click();

    await slowExpect(page.locator('.my-4').first()).toHaveText('Shop');

    await page.locator('app-card')
              .filter({ hasText: 'Nokia Edge'})
              .getByRole('button', { name: 'Add' })
              .click();
});
